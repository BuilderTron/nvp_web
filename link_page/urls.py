from django.urls import path
from . import views

app_name = 'link_page'

urlpatterns = [
    path('', views.link_page, name="link_page"),

]
