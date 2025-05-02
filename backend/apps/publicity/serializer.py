from rest_framework import serializers
from .models import Publicity

class PublicitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Publicity
        fields = '__all__'