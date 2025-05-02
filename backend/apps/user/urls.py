
""""
from django.urls import path
from .views import register_user, users, edit_user, delete_user

urlpatterns = [
    path('registro/', register_user, name='registro'),
    path('usuarios/', users, name='usuarios'),
    path('actualizar/<int:user_dni>/', edit_user, name='actualizar'),
    path('eliminar/<int:user_dni>/', delete_user, name='eliminar'),
]
    """

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import UserViewSet, CustomTokenObtainPairView

router = DefaultRouter()
router.register(r'users', UserViewSet)

# urlpatterns = [
#     path('registro/', register_user, name='registro'),
# ]

urlpatterns = [
    path('', include(router.urls)),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', UserViewSet.as_view({'post': 'logout'}), name='logout'),
]
