from django.urls import path
from . import views



urlpatterns = [
    path('', views.home, name="home"),

    path('about', views.about, name="about"),

    path('services', views.services, name="services"),
    path('services_photo', views.services_photo, name="services_photo"),
    path('services_film', views.services_film, name="services_film"),
    path('services_corporate', views.services_corporate, name="services_corporate"),

    path('portfolio', views.portfolio, name="portfolio"),
    path('portfolio_wedding', views.portfolio_wedding, name="portfolio_wedding"),
    path('portfolio_quince', views.portfolio_quince, name="portfolio_quince"),
    path('portfolio_portrait', views.portfolio_portrait, name="portfolio_portrait"),
    path('portfolio_commercial', views.portfolio_commercial, name="portfolio_commercial"),
    path('portfolio_grad', views.portfolio_grad, name="portfolio_grad"),
    path('portfolio_maternity', views.portfolio_maternity, name="portfolio_maternity"),
    path('portfolio_engagement', views.portfolio_engagement, name="portfolio_engagement"),

    # path('clients.html', views.clients, name="clients"),
    # path('blog', views.blog, name="blog"),

    path('contact', views.contact, name="contact"),
    
    path('test', views.test, name="test"),
    
]
