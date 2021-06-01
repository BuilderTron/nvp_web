from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('about.html', views.about, name="about"),
    path('services.html', views.services, name="services"),
    path('portfolio.html', views.portfolio, name="portfolio"),
    # path('clients.html', views.clients, name="clients"),
    path('blog.html', views.blog, name="blog"),
    path('contact.html', views.contact, name="contact"),
    
]
