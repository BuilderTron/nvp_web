from django.shortcuts import render, get_object_or_404
from .models import Blog

# Create your views here.
def all_blogs (request):
    blogs = Blog.objects.order_by('-publish')
    return render(request, 'blog/all_blogs.html', {'blogs': blogs})

def single_blog (request, blog_id):
    blog = get_object_or_404(Blog, pk=blog_id)
    return render(request, 'blog/single_blog.html', {'blog':blog})

# def featured_blogs (request):
#     feat_blog = Blog.objects.order_by('-publish')[:2]
#     return render(request, 'website/index.html', {'feat_blogs': feat_blog})