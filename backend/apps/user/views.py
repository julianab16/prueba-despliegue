

""""
from .forms import CustomUserForm, UpdateUserForm
from .models import User

def register_user(request):
    if request.method == 'POST':
        form = CustomUserForm(request.POST)
        if form.is_valid():
            form.save()
        usuarios = User.objects.all()
        return render(request, 'usuarios.html', {'form': form, 'usuarios': usuarios})
    else:
        form = CustomUserForm()
    return render(request, 'register.html', {'form': form})

def users(request):
    usuarios = User.objects.all()
    return render(request, 'usuarios.html', {'usuarios': usuarios})

def edit_user(request, user_dni):
    user = User.objects.get(dni=user_dni)
    if request.method == 'POST':
        form = UpdateUserForm(request.POST, instance=user)
        if form.is_valid():
            form.save()
            return redirect('usuarios')
    else:
        form = UpdateUserForm(instance=user)
    return render(request, 'actualizar.html', {'form': form})

def delete_user(request, user_dni):
    user = User.objects.get(dni=user_dni)
    user.delete()
    usuarios = User.objects.all()
    return render(request, 'usuarios.html', {'usuarios': usuarios})

        """""

from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializer import UserSerializer, CustomTokenObtainPairSerializer


# def register_user(request):
#     if request.method == 'POST':
#         form = CustomUserForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return redirect('login')  # O donde quieras redirigir después de registrar
#     else:
#         form = CustomUserForm()
#     return render(request, 'register.html', {'form': form})

# def hello(request): #borrar esto despues de probar
#     return HttpResponse('hello.html')

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return super().get_permissions()
    
    @action(detail=False, methods=['post'], permission_classes=[permissions.AllowAny])
    def logout(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Sesión cerrada correctamente"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'], url_path='by_dni', permission_classes=[permissions.AllowAny])
    def by_dni(self, request):
            dni = request.query_params.get('dni')
            if not dni:
                return Response({"error": "DNI requerido"}, status=400)
            user = User.objects.filter(dni=dni).first()
            if not user:
                return Response([], status=200)
            serializer = self.get_serializer(user)
            return Response([serializer.data], status=200)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
