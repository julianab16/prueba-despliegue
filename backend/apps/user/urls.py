from django.urls import path
from .views import register_user, users, edit_user, delete_user

urlpatterns = [
    path('registro/', register_user, name='registro'),
    path('usuarios/', users, name='usuarios'),
    path('actualizar/<int:user_dni>/', edit_user, name='actualizar'),
    path('eliminar/<int:user_dni>/', delete_user, name='eliminar'),
]
