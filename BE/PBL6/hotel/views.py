from django.shortcuts import render
from rest_framework import status, viewsets
from .serializers import HotelSerializer
from hotel.models import Hotel, Booking, ActivityLog, StaffOnDuty, Room, RoomType

#Trả về danh sách khách sạn có trạng thái live
def index(request):
    hotels = Hotel.objects.filter(status='Live')
    context = {
        'hotels': hotels,
    }
    return render(request, "hotel/hotel.html", context)

#Chi tiết khách sạn theo slug
def hotel_detail(request, slug):
    hotel = Hotel.objects.get(status='Live', slug=slug)
    context = {
        'hotel': hotel,
    }
    return render(request, 'hotel/hotel_detail.html', context)

#Thông tin chi tiết 1 loại phòng
def room_type_detail(request, slug, rt_slug):#king>luxury>eco>basic
    hotel = Hotel.objects.get(status='Live', slug=slug)
    room_type = RoomType.objects.get(hotel=hotel, slug=rt_slug)
    rooms = Room.objects.filter(room_type=room_type, is_available=True)
    
    context={
        'hotel': hotel,
        'room_type' : room_type,
        'rooms' : rooms,
    }
    
    return render(request, 'hotel/hotel_type_detail.html', context)
