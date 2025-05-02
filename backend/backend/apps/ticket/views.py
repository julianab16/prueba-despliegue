from django.shortcuts import render
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from .models import Ticket
#from .forms import TuFormulario

def mi_vista(request):
    return HttpResponse("hola, soy yo")