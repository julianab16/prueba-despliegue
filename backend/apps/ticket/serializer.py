from rest_framework import serializers
from .models import Ticket

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = [
            'id_ticket', 'title', 'description', 'status', 'priority', 
            'created_at', 'updated_at', 'user', 'assigned_to', 
            'punto_atencion', 'content'
        ]