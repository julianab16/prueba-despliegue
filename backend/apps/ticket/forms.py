from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import Ticket 

class CustomUserForm(UserCreationForm):
    class Meta:
        model = Ticket
        fields = ['username']
