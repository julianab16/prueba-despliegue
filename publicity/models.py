from django.db import models

# Create your models here.

class Publicity(models.Model):
    id_publicity =  models.CharField(max_length=255, primary_key=True)
    title = models.CharField(max_length=255)
    content = models.TextField()
    image = models.ImageField(upload_to='publicidad_images/')
    start_date = models.DateField()
    end_date = models.DateField()
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = "publicity"
        
    def __str__(self):
        return self.title

