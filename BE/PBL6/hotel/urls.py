from django.urls import path,include
from django.contrib import admin
from hotel import views
from rest_framework.routers import DefaultRouter

app_name = "hotel"

urlpatterns = [
    path("", views.index, name="index"),
    path("detail/<slug>/", views.hotel_detail, name="hotel_detail"),
    path("detail/<slug:slug>/room-type/<slug:rt_slug>/", views.room_type_detail, name="room_type_detail"),
    path('admin/', admin.site.urls),
    path('api/detail/', include('hotel.api_urls')),
]
