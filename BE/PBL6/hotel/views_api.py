from rest_framework import status, viewsets, permissions, generics
from rest_framework.decorators import api_view, action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Hotel, RoomType, Room
from .serializers import HotelSerializer, RoomTypeSerializer, RoomSerializer
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAdminUser

class HotelViewSet(viewsets.ModelViewSet):
    queryset = Hotel.objects.filter(status='Live')
    serializer_class = HotelSerializer
    lookup_field = 'slug'
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        queryset = self.queryset
        name = self.request.query_params.get('name', None)
        if name:
            queryset = queryset.filter(name__icontains=name)  # Tìm kiếm không phân biệt chữ hoa chữ thường
        return queryset

#Endpoint : Ẩn/hiện khách sạn ....
    @action(methods=['POST'], detail=True, url_path='hide-hotel', url_name='hide_hotel')
    def hide_hotel(self, request,  slug=None):
        try:
            h = Hotel.objects.get(slug=slug)
            h.status = 'Disable'
            h.save()
        except:
            return Response({'Error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response(data=HotelSerializer(h).data, status=status.HTTP_200_OK)
    
    @action(methods=['POST'], detail=True, url_path='display-hotel', url_name='display-hotel')
    def display_hotel(self, request, slug=None):
        try:
            h = Hotel.objects.get(slug=slug)
            h.status = 'Live'
            h.save()
        except:
            return Response({'Error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response(data=HotelSerializer(h).data, status=status.HTTP_200_OK)

class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.filter(is_available=True)
    serializer_class = RoomSerializer

    @action(methods=['GET'], detail=False, url_path='hotels/<slug:h_slug>/room-type/<slug:rt_slug>/rooms/')
    def room_by_roomtype(self, request, h_slug, rt_slug):
        try:
            h  = Hotel.objects.get(status='Live', slug=h_slug)
            rt = RoomType.objects.get(hotel=h, slug=rt_slug)
            r  = Room.objects.filter(room_type=rt, is_available=True)
        except:
            return Response({'Error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response({
            'hotel': HotelSerializer(h).data,
            'roomtype': RoomTypeSerializer(rt).data,
            'list room': RoomSerializer(r, many=True).data
        }, status=status.HTTP_200_OK)
    
class RoomTypeViewSet(viewsets.ModelViewSet):
    queryset = RoomType.objects.all()
    serializer_class = RoomTypeSerializer

    @action(methods=['GET'], detail=False, url_path='hotels/<slug:h_slug>/room-types/')
    def roomtype_by_hotel(self, request, h_slug):
        try:
            h = Hotel.objects.get(slug=h_slug)
            rt = RoomType.objects.filter(hotel=h)
        except:
            return Response({'Error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response({
            'hotel': HotelSerializer(h).data,
            'roomtype': RoomTypeSerializer(rt, many=True).data
        }, status=status.HTTP_200_OK)



@api_view(['GET'])
def index(request):
    hotels = Hotel.objects.filter(status='Live')
    serializer = HotelSerializer(hotels, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def room_type_detail(request, slug, rt_slug):
    try:
        hotel = Hotel.objects.get(status='Live', slug=slug)
        room_type = RoomType.objects.get(hotel=hotel, slug=rt_slug)
        rooms = Room.objects.filter(room_type=room_type, is_available=True)
    except (Hotel.DoesNotExist, RoomType.DoesNotExist):
        return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

    room_type_serializer = RoomTypeSerializer(room_type)
    rooms_serializer = RoomSerializer(rooms, many=True)
    
    return Response({
        'hotel': HotelSerializer(hotel).data,
        'room_type': room_type_serializer.data,
        'rooms': rooms_serializer.data
    })
