from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Attention_Point
from .serializer import AttentionPointSerializer

class AttentionPointListView(APIView):
    def get(self, request):
        points = Attention_Point.objects.all()
        serializer = AttentionPointSerializer(points, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = AttentionPointSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class AttentionPointDetailView(APIView):
    def delete(self, request, pk):
        try:
            point = Attention_Point.objects.get(pk=pk)
            point.delete()
            return Response({"message": "Punto de atención eliminado correctamente"}, status=status.HTTP_204_NO_CONTENT)
        except Attention_Point.DoesNotExist:
            return Response({"error": "Punto de atención no encontrado"}, status=status.HTTP_404_NOT_FOUND)
