from django.shortcuts import render, get_object_or_404
from .models import HeroSlide, Service, Event
from blog.models import Blog

# Home page.
def home(request):
    slide = HeroSlide.objects.all()
    service = Service.objects.all()
    event = Event.objects.all()
    feat_blog = Blog.objects.order_by('-publish')[:2]
    return render(request, 'home/index.html', {'slides': slide, 'services': service, 'events': event, 'feat_blogs': feat_blog})





def about(request):
    return render(request, 'home/about.html', {})





def services(request):
    return render(request, 'home/services.html', {})




def portfolio(request):
    return render(request, 'home/portfolio.html', {})

def portfolio_wedding(request):
    return render(request, 'home/portfolio_wedding.html', {})

def portfolio_quince(request):
    return render(request, 'home/portfolio_quince.html', {})

def portfolio_portrait(request):
    return render(request, 'home/portfolio_portrait.html', {})

def portfolio_commercial(request):
    return render(request, 'home/portfolio_commercial.html', {})




# def clients(request):
#     return render(request, 'clients.html', {})


def blog(request):
    return render(request, 'home/blog.html', {})


def sin_blog(request, blog_id):
    blog = get_object_or_404(Blog, pk=blog_id)
    return render(request, 'home/blog/single_blog.html', {'blog': blog})


def contact(request):
    return render(request, 'home/contact.html', {})



# Test page for models and forms
def test(request):
    
    return render(request, 'home/test.html', {})
