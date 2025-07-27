from rest_framework import serializers
from .models import Publicity

class PublicitySerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Publicity
        fields = ['id_publicity', 'title', 'content', 'image', 'image_url', 'start_date', 'end_date', 'is_active']

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None

    #prueba, no se si esta bien jahsjshbajbhadjsahdja
    # def ejecutar_por_fechas(self, data):
    #     if data.get('is_active') == True:
    #         diferencia = data.get('start_date') - data.get('end_date')
    #         if diferencia < 0:
    #             data.get('is_active') = False
    #             raise serializers.ValidationError("La fecha de inicio no puede ser posterior a la fecha final.")
    #     raise serializers.ValidationError("La publicidad debe estar activa para ejecutar por fechas.")

