from django.urls import path
from .views import register_user

urlpatterns = [
    path('registro/', register_user, name='registro'),
]
