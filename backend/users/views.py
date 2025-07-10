from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.contrib.auth import logout
from rest_framework import response, status
from .serializers import (UserRegistrationSerializer, LoginSerializer, 
                          ProfileSerializer, UpdataProfileSerializer,
                            ChangePasswordSerializer)

from users.models import CustomUser

# Create your views here.
@api_view(['POST']) # API Tested OK 
@permission_classes([AllowAny])
def register(request):
    serializer = UserRegistrationSerializer(data = request.data)

    if serializer.is_valid():
        user = serializer.save()
        token, created = Token.objects.get_or_create(user = user)
        return Response({
            'message': 'User created successfully',
            'token': token.key,
            'user': {
                'username': user.username,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'email': user.email
            }
        }, status = status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(['POST']) #API Tested OK
@permission_classes([AllowAny])
def login(request):
    serializer = LoginSerializer(data = request.data)

    if serializer.is_valid():
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user = user)
        return Response({
            'message': 'Login successful',
            'token': token.key,
            'user': {
                'id': user.id,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
            }
        }, status = status.HTTP_200_OK)
    
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_logout(request):
    request.user.auth_token.delete()
    logout(request)
    return response({
        'message': 'Logout successful.'
    }, status = status.HTTP_200_OK)

@api_view(['GET']) # API Tested OK
@permission_classes([IsAuthenticated])
def profile(request):

    user_profile = request.user
    # user_profile = CustomUser.objects.get(username = 'shiva123@gmail.com') # For API testing purpose
    serializer = ProfileSerializer(user_profile)

    return Response(serializer.data, status = status.HTTP_200_OK)

@api_view(['PUT']) # API Tested OK
@permission_classes([IsAuthenticated])
def update_profile(request):
    user = request.user
    #user = CustomUser.objects.get(username = 'shiva123@gmail.com') # For API testing purpose
    serializer = UpdataProfileSerializer(user, data = request.data)

    if serializer.is_valid():
        serializer.save()

        return Response({
            'message': 'Profile Update succesfully',
            'user': UpdataProfileSerializer(user).data
        }, status = status.HTTP_200_OK)
    
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def change_password(request):
    # user = CustomUser.objects.get(username = 'shiva123@gmail.com') # For API testing purpose
    serializer = ChangePasswordSerializer(data = request.data, context = {'request': request})
    
    if serializer.is_valid():
        user = request.user
        new_password = serializer.validated_data['new_password']
        user.set_password(new_password)
        user.save()
        return Response({
            'message': 'Password changed successfully.'
        }, status = status.HTTP_200_OK)
    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)