from django.db import models

class Attention_Point(models.Model):

    attention_point_id = models.CharField(primary_key=True, max_length=6, unique=True)
    availability = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        if not self.attention_point_id:
            # Buscar el último ID creado
            last_point = Attention_Point.objects.order_by('-attention_point_id').first()
            if last_point:
                # Extraer el número y sumarle 1
                last_num = int(last_point.attention_point_id.split('-')[1])
                new_num = last_num + 1
            else:
                new_num = 1
            self.attention_point_id = f"PA-{new_num:02d}"
        super().save(*args, **kwargs)


    def __str__(self):
        return f"{self.attention_point_id} ({'available' if self.availability else 'occupied'})"
    
    class Meta:
        db_table='punto_atencion'
        verbose_name = 'Punto de Atención'
        verbose_name_plural = 'Puntos de Atención'