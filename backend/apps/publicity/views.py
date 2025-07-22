from django.shortcuts import render, redirect

# Create your views here.
from .forms import PublicityForm as SubirDumentoImagenForm
from .models import Publicity as SubirDumentoImagen
from rest_framework.views import APIView

class PublicityView(APIView):

	def homepage(request):
		form = SubirDumentoImagenForm()
		return render(request, 'index.html', {'form': form})
	#homepage funcion para renderizar la pagina de inicio

	def upload(request):
		if request.method == "POST":
			form = SubirDumentoImagenForm(request.POST, request.FILES)
			if form.is_valid():
				form.save()
			return redirect("homepage")
		form = SubirDumentoImagenForm()
		movies = SubirDumentoImagen.objects.all()
		return render(request=request, template_name="index.html", context={'form': form, 'movies': movies})

	def delete(request, id):
		publicity = SubirDumentoImagen.objects.get(id_publicity=id)
		publicity.delete()
		return redirect("homepage")