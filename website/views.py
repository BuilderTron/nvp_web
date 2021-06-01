from django.shortcuts import render
from .models import HomeSlider

# Create your views here.
def home(request):
    slide = HomeSlider.objects.all()
    return render(request, 'index.html', {'slides': slide})


def about(request):
    return render(request, 'about.html', {})


def services(request):
    return render(request, 'services.html', {})


def portfolio(request):
    return render(request, 'portfolio.html', {})


# def clients(request):
#     return render(request, 'clients.html', {})


def blog(request):
    return render(request, 'blog.html', {})


def contact(request):
    return render(request, 'contact.html', {})



# Test page for models and forms
def test(request):
    
    return render(request, 'test.html', {})
