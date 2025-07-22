from rest_framework import serializers
from .models import Ticket

class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = [
            'id_ticket','status', 'priority', 
            'created_at', 'updated_at', 'user'
        ]
        read_only_fields = ['id_ticket']

        