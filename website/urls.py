from django.urls import path
from . import views



urlpatterns = [
    path('', views.home, name="home"),
    path('about', views.about, name="about"),
    path('services', views.services, name="services"),

    path('portfolio', views.portfolio, name="portfolio"),
    path('portfolio_wedding', views.portfolio_wedding, name="portfolio_wedding"),
    path('portfolio_quince', views.portfolio_quince, name="portfolio_quince"),
    path('portfolio_portrait', views.portfolio_portrait, name="portfolio_portrait"),
    path('portfolio_commercial', views.portfolio_commercial, name="portfolio_commercial"),

    # path('clients.html', views.clients, name="clients"),
    # path('blog', views.blog, name="blog"),
    path('contact', views.contact, name="contact"),
    path('test', views.test, name="test"),
    
]
