from rest_framework import serializers
from .models import User

""""
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'username', 'first_name', 'last_name', 'email', 
            'dni', 'phone_number', 'role', 'prioridad', 'password'
        ]
        extra_kwargs = {'password': {'write_only': True}}

        """

from django.contrib.auth import get_user_model, authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = [
#             'id', 'username', 'first_name', 'last_name', 'email', 
#             'dni', 'phone_number', 'role', 'prioridad', 'password'
#         ]
#         extra_kwargs = {'password': {'write_only': True}}

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    is_staff = serializers.BooleanField(required=False)  # Agregar el campo is_staff

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 
                  'dni', 'phone_number', 'password', 'role', 'prioridad', 'is_staff']
    
    def create(self, validated_data):
        is_staff = validated_data.pop('is_staff', False)  # Obtener is_staff del frontend
        user = User.objects.create_user(
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            dni=validated_data['dni'],
            phone_number=validated_data['phone_number'],
            password=validated_data['password'],
            is_staff=is_staff,  # Asignar is_staff al usuario
        )
        return user
    
    def update(self, instance, validated_data):
        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        instance.save()
        return instance


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        token['username'] = user.username
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['dni'] = user.dni
        
        return token
