from django.shortcuts import render, get_object_or_404
from .models import HeroSlide, Service, Event
from blog.models import Blog

# Create your views here.
def home(request):
    slide = HeroSlide.objects.all()
    service = Service.objects.all()
    event = Event.objects.all()
    feat_blog = Blog.objects.order_by('-publish')[:2]
    return render(request, 'index.html', {'slides': slide, 'services': service, 'events': event, 'feat_blogs': feat_blog})


def sin_blog(request, blog_id):
    blog = get_object_or_404(Blog, pk=blog_id)
    return render(request, 'blog/single_blog.html', {'blog': blog})


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
