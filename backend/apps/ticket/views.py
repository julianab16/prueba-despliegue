from .models import Ticket
from .serializer import TicketSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Case, When, IntegerField
from rest_framework.permissions import AllowAny
import uuid


class TicketListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        tickets = Ticket.objects.annotate(
            priority_order=Case(
                When(priority='high', then=0),
                When(priority='low', then=1),
                output_field=IntegerField(),
            )
        ).order_by('priority_order', 'created_at')
        serializer = TicketSerializer(tickets, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        data = request.data.copy()
        # Generar un id_ticket único (puedes personalizar el formato)
        data['id_ticket'] = f"TICKET{uuid.uuid4().hex[:6].upper()}"
        serializer = TicketSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)