from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from .models import Hotel, RoomType, Room, Booking

class HotelSerializer(ModelSerializer):
    class Meta:
        model = Hotel
        fields = '__all__'

class RoomTypeSerializer(ModelSerializer):
    class Meta:
        model = RoomType
        fields = '__all__'

class RoomSerializer(ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'

class BookingSerializer(ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'