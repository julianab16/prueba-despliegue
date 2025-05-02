from django.shortcuts import render, redirect
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

        
