from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True, min_length = 8)
    confirm_password = serializers.CharField(write_only = True)

    class Meta: 
        model = CustomUser
        fields = ['email', 'first_name', 'last_name', 'phone_number', 'password', 'confirm_password']

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError('Password do not match')
        return attrs
    
    def create(self, validated_data):
        validated_data.pop['confirm_password'] # Removing the confirm_password as we do not save this on database
        user = CustomUser.objects.create_user(**validated_data) # Creating a new user 
        return user
    
class LoginSerializer(serializers.ModelSerializer):
    email = serializers.CharField(unique = True)
    password = serializers.CharField(write_only = True, min_length = 8)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password: 
            user = authenticate(username = email, password = password)
            if not user:
                raise serializers.ValidationError("Invalid Credentials")
            attrs['user'] = user
        else:
            raise serializers.ValidationError('Must include email and password')
        
        return attrs