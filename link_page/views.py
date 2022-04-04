from django.shortcuts import render
from .models import Link

# Create your views here.
def link_page (request):
    link = Link.objects.all()
    return render(request, 'link_page/link_page.html', {'links':link})
