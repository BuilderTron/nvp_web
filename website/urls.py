from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('about', views.about, name="about"),
    path('services', views.services, name="services"),
    path('portfolio', views.portfolio, name="portfolio"),
    # path('clients.html', views.clients, name="clients"),
    path('blog', views.blog, name="blog"),
    path('contact', views.contact, name="contact"),
    path('test', views.test, name="test"),
    
]
