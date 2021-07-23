from django.db import models
from django.utils import timezone

# Create your models here.
class Blog (models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='images/blog', blank=True, null=True)
    description = models.TextField(blank=True)
    url = models.URLField(blank=True)
    # slug = models.SlugField(max_length=250, unique_for_date='publish')
    publish = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title
