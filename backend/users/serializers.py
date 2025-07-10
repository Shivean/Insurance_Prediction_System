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
        validated_data.pop('confirm_password') # Removing the confirm_password as we do not save this on database
        user = CustomUser.objects.create_user(username = validated_data['email'], **validated_data) # Creating a new user 
        return user
    
class LoginSerializer(serializers.ModelSerializer):
    email = serializers.CharField()
    password = serializers.CharField(write_only = True, min_length = 8)

    class Meta:
        model = CustomUser
        fields = ['email', 'password']

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
    
class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ['first_name', 'last_name', 'phone_number', 'email', 'created_at']
        read_only_fields = fields

class UpdataProfileSerializer(serializers.ModelSerializer):
    class Meta: 
        model = CustomUser
        fields = ['first_name', 'last_name', 'phone_number']

class ChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(write_only = True)
    new_password = serializers.CharField(write_only = True)
    confirm_new_password = serializers.CharField(write_only = True)

    def validate_current_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError('Current password is incorrect.')
        return value

    def validate(self, attrs):
        if attrs['new_password'] != attrs['confirm_new_password']:
            raise serializers.ValidationError("Password don't match.")
        return attrs
        