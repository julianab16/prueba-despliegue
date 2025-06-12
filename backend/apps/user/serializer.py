from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer



class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)  # Hacer password opcional
    is_staff = serializers.BooleanField(required=False)  # Agregar el campo is_staff
    prioridad = serializers.BooleanField(default=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 
                  'dni', 'phone_number', 'password', 'role', 'prioridad', 'is_staff']
    
    def validate(self, data):
        # Si el usuario NO es cliente, la contraseña es obligatoria
        if data.get('role') != 'CLIENTE' and not data.get('password'):
            raise serializers.ValidationError({'password': 'Este campo es obligatorio.'})
         # Validar que discapacidad solo se use con CLIENTE
        if data.get('role') != 'CLIENTE' and data.get('prioridad'):
            raise serializers.ValidationError({'prioridad': 'Solo los usuarios con rol CLIENTE pueden tener discapacidad.'})
        
        return data
    
    def create(self, validated_data):
        is_staff = validated_data.pop('is_staff', False)  # Obtener is_staff del frontend
        password = validated_data.pop('password', None)  # Obtener la contraseña (si la hay)
        # Si no hay contraseña para roles que no sean 'CLIENTE', se debe lanzar una excepción
        if validated_data.get('role') != 'CLIENTE' and not password:
            raise serializers.ValidationError({'password': 'La contraseña es obligatoria para este rol.'})

        # Crear el usuario
        user = User(**validated_data)
        user.is_staff = is_staff

        if password:
            user.set_password(password)  # Si hay contraseña, establecerla

        user.save()  # Guardar el usuario
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
        token['role'] = user.role
        
        return token
