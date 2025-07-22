from rest_framework import serializers
from .models import Publicity

class PublicitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Publicity
        fields = '__all__'
        from rest_framework import serializers

    #prueba, no se si esta bien jahsjshbajbhadjsahdja
    def ejecutar_por_fechas(self, data):
        if data.get('is_active') == True:
            diferencia = data.get('start_date') - data.get('end_date')
            if diferencia < 0:
                data.get('is_active') = False
                raise serializers.ValidationError("La fecha de inicio no puede ser posterior a la fecha final.")
        raise serializers.ValidationError("La publicidad debe estar activa para ejecutar por fechas.")

