from rest_framework import serializers
from .models import Attention_Point
from apps.ticket.models import Ticket

class AttentionPointSerializer(serializers.ModelSerializer):
    attention_point_id = serializers.CharField(read_only=True) 
    current_ticket = serializers.SerializerMethodField() 

    class Meta:
        model = Attention_Point
        fields = ['attention_point_id', 'availability', 'current_ticket'] 
    
    def get_current_ticket(self, obj):
        ticket = Ticket.objects.filter(punto_atencion=obj, status='in_progress').first()
        return ticket.id_ticket if ticket else None