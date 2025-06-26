from rest_framework import serializers
from .models import Attention_Point

class AttentionPointSerializer(serializers.ModelSerializer):
    attention_point_id = serializers.CharField(read_only=True)  

    class Meta:
        model = Attention_Point
        fields = '__all__' 