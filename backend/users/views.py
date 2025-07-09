from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from rest_framework import response, status
from .serializers import UserRegistrationSerializer, LoginSerializer


# Create your views here.
@api_view(['POST'])
def register(request):
    serializer = UserRegistrationSerializer(data = request.data)
    
    if serializer.is_valid():
        user = serializer.save()
        token = Token.objects.get_or_create(user = user)
        return response({
            'message': 'User created successfully',
            'token': token.key,
            'user': {
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email
            }
        }, status = status.HTTP_201_CREATED)
    
    return response(serializer.error, status = status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    serializer = LoginSerializer(data = request.data)

    if serializer.is_valid():
        user = serializer.validated_data(['user'])
        token, created = Token.objects.get_or_create(user = user)
        return response({
            'message': 'Login successful',
            'token': token.key,
            'user': {
                'id': user.id,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
            }
        }, status = status.HTTP_200_OK)
    
    return response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)