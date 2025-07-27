from django.urls import path
from . import views
from .views import PublicityListView, PublicityDetailView

urlpatterns = [
    # path("", views.homepage, name="homepage"),
    path('api/publicity/', PublicityListView.as_view(), name='publicity-list'),
    path('api/publicity/<str:pk>/', PublicityDetailView.as_view(), name='publicity-detail'),
]