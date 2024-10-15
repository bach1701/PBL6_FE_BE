from django.urls import path,include
from django.contrib import admin
from userauths import views

app_name = "userauths"

urlpatterns = [
    path("sign-up/", views.RegisterView, name="sign-up"),
    path("sign-in/", views.loginViewTemp, name="sign-in"),
    path("sign-out/", views.logoutView, name="sign-out"),
    path('admin/', admin.site.urls),
    
    path('api/userauths/', include('userauths.api_urls')),
]