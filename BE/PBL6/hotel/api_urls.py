from django.urls import path, re_path, include
from .views_api import index, room_type_detail
from hotel import views, views_api
from rest_framework.routers import DefaultRouter

app_name = "hotel_api"

router = DefaultRouter()
router.register('hotels', views_api.HotelViewSet)
router.register('rooms', views_api.RoomViewSet)
router.register('roomtypes', views_api.RoomTypeViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('hotels/<slug:h_slug>/room-types/<slug:rt_slug>/rooms/', 
         views_api.RoomViewSet.as_view({'get': 'room_by_roomtype'}), name='room-by-roomtype'),
    path('hotels/<slug:h_slug>/room-types/', 
         views_api.RoomTypeViewSet.as_view({'get': 'roomtype_by_hotel'}), name='roomtype-by-hotel'),
    ]
