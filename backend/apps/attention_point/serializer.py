from rest_framework import serializers
from .models import Attention_Point

class AttentionPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attention_Point
        fields = '__all__' 