from django.shortcuts import render, get_object_or_404
from django.core.mail import send_mail
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

def services_photo(request):
    return render(request, 'home/services_photo.html', {})

def services_film(request):
    return render(request, 'home/services_film.html', {})

def services_corporate(request):
    return render(request, 'home/services_corporate.html', {})




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

def portfolio_grad(request):
    return render(request, 'home/portfolio_grad.html', {})

def portfolio_maternity(request):
    return render(request, 'home/portfolio_maternity.html', {})

def portfolio_engagement(request):
    return render(request, 'home/portfolio_engagement.html', {})




# def clients(request):
#     return render(request, 'clients.html', {})


# def blog(request):
#     return render(request, 'home/blog.html', {})


def sin_blog(request, blog_id):
    blog = get_object_or_404(Blog, pk=blog_id)
    return render(request, 'home/blog/single_blog.html', {'blog': blog})


def contact(request):
    if request.method == "POST":
        your_name = request.POST['your_name']
        email = request.POST['email']
        message = request.POST['message']

        msg_mail = "Name: " + str(your_name) + "\n\nEmail: " + str(email) + "\n\nMessage: " + str(message)
# Send Email
        send_mail(
            'NVP Web: ' + your_name,
            msg_mail,
            email,
            ['nvp20events@gmail.com'],
            fail_silently=False,
        )

        return render(request, 'home/contact.html', {'your_name': your_name})

    else:
        return render(request, 'home/contact.html', {})



# Test page for models and forms
def test(request):

    return render(request, 'home/test.html', {})
