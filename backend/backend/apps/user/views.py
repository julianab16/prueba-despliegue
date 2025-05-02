from django.shortcuts import render, redirect
from .forms import CustomUserForm

def register_user(request):
    if request.method == 'POST':
        form = CustomUserForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')  # O donde quieras redirigir después de registrar
    else:
        form = CustomUserForm()
    # return render(request, 'register.html', {'form': form})
