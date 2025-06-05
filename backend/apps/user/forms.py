from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User 

class CustomUserForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'dni', 'phone_number', 'role', 'prioridad', 'password1', 'password2']

# Formulario para actualizar un usuario
class UpdateUserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'dni', 'phone_number', 'role', 'prioridad']