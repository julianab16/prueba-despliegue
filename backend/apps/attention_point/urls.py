from django.urls import path
from .views import AttentionPointListView, AttentionPointDetailView

urlpatterns = [
    path('', AttentionPointListView.as_view(), name='attention_point_list'),
    path('<str:pk>/', AttentionPointDetailView.as_view(), name='attention_point_detail'),  # Nueva ruta
]