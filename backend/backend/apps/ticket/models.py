from django.db import models
from apps.attention_point.models import Attention_Point
from apps.user.models import User

class Ticket(models.Model):
    # El ticket puede estar en proceso, cerrado o abierto
    STATUS_CHOICES = [
        ('open', 'Open'),
        ('in_progress', 'In Progress'),
        ('closed', 'Closed'),
    ]
    # El ticket puede tener prioridad bajo o alta
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('high', 'High'),
    ]

    id_ticket =  models.CharField(max_length=255, primary_key=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open')
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='low')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tickets_created')
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='tickets_assigned')
    punto_atencion = models.ForeignKey(Attention_Point, on_delete=models.SET_NULL, null=True)
    
    # La informacion que hay dentro del ticket
    content = models.TextField(default='Default content')
    class Meta:
        db_table = "ticket"
        
    def __str__(self):
        return self.title
