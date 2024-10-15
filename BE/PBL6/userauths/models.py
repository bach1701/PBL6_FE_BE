from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from shortuuid.django_fields import ShortUUIDField
from django.dispatch import receiver
import shortuuid

USER_ROLES = (
    ("Admin", "Admin"),
    ("Receptionist", "Receptionist"),
    ("Customer", "Customer"),
)

GENDER = (
    ("Female","Female"),
    ("Male","Male"),
    ("Other","Other"),
)

INDENTITY_TYPE = (
    ("Nation Indentification Number","Nation Indentification Number"),
    ("Driven's License","Driven's License"),
    ("International Passport","International Passport"),
)
def user_directory_path(instance, filename):
    ext = filename.split(".")[-1]
    filename = "%s.%s" % (instance.user.id,filename)
    return "user_{0}/{1}".format(instance.user.id,filename)

# Create your models here.
class User(AbstractUser):
    full_name = models.CharField(max_length=500, null=True, blank=True)
    username = models.CharField(max_length=500, unique=True)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=500, null=True, blank=True)
    gender = models.CharField(max_length=20, choices=GENDER, default="Other")
    role = models.CharField(max_length=20, choices=USER_ROLES, default="Customer")
    otp = models.CharField(max_length=100, null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username

class Profile(models.Model):
    pid = ShortUUIDField(length=7, max_length=25, alphabet="abcdefghijklmnopqrstuwxyz123" )
    image = models.FileField(upload_to=user_directory_path, default="default.jpg", null=True, blank=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=500, null=True, blank=True)
    phone =models.CharField(max_length=100,null=True, blank=True)
    gender = models.CharField(max_length=20, choices=GENDER, default="Other")

    country = models.CharField(max_length=100, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    state = models.CharField(max_length=100, null=True, blank=True)
    address = models.CharField(max_length=1000, null=True, blank=True)

    indentity_type = models.CharField(max_length=200, choices=INDENTITY_TYPE, null=True, blank=True)
    indentity_image = models.FileField(upload_to=user_directory_path, default="id.jpg", null=True, blank=True)

    facebook = models.URLField(null=True, blank=True)
    twitter = models.URLField(null=True, blank=True)

    wallet = models.DecimalField(max_digits=32, decimal_places=2, default=0.00)
    verified = models.BooleanField(default=False)

    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering =['-date']
    def __str__(self) -> str:
        if self.full_name:
            return f"{self.full_name}"
        else:
            return f"{self.user.username}"
    
# New model for SystemAdmin
class SystemAdmin(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    adminID = models.CharField(max_length=100, unique=True)  # Example field
    # Add specific fields and methods for SystemAdmin

    def manage_hotel(self):
        # Example method for managing a hotel
        pass

# New model for Receptionist
class Receptionist(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    receptionistID = models.CharField(max_length=100, unique=True, null=False, blank=False)  
    hotelID = models.IntegerField(null=True, blank=True)  # Assuming this links to a Hotel model
    # Add specific fields and methods for Receptionist

    def manage_booking(self):
        # Example method for managing bookings
        pass

# New model for Customer
class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    customerID = models.CharField(max_length=100, unique=True)  # Example field
    bookingID = models.IntegerField(null=True, blank=True)  # Assuming this links to a Booking model
    # Add specific fields and methods for Customer

    def create_booking(self):
        # Example method for creating a booking
        pass


# def create_user_profile(sender, instance, created, **kwargs):
#     if created:
#         Profile.objects.create(user=instance)

# def save_user_profile(sender, instance, **kwargs):
#     instance.profile.save()


# Signals to create profile automatically
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
        if instance.role == "Admin":
            SystemAdmin.objects.create(user=instance)
        elif instance.role == "Receptionist":
            Receptionist.objects.create(user=instance)
        elif instance.role == "Customer":
            unique_customer_id = shortuuid.uuid()  # Generate a unique ID for customerID
            Customer.objects.create(user=instance, customerID=unique_customer_id, bookingID=0)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)