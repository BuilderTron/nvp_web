from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, 'index.html', {})


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
