from django.db import models

class Attention_Point(models.Model):

    attention_point_id = models.CharField(primary_key=True, max_length=2)
    availability = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.attention_point_id} ({'available' if self.availability else 'occupied'})"
    
    class Meta:
        db_table='punto_atencion'
        verbose_name = 'Punto de Atención'
        verbose_name_plural = 'Puntos de Atención'