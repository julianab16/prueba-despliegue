from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User  # Asegúrate de importar tu modelo personalizado

class CustomUserForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'dni', 'phone_number', 'role', 'prioridad', 'password1', 'password2']
