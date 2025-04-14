from django.urls import path
from . import views  # Importa las vistas desde el archivo views.py de la misma aplicación

urlpatterns = [
    path('', views.mi_vista, name='mi_vista'),  # Define la ruta para la vista 'mi_vista'
]