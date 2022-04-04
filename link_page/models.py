from django.db import models

# Create your models here.
class Link (models.Model):
    title = models.CharField(max_length=200)
    imageBG = models.ImageField(upload_to='images/link_page',blank=True,null=True)
    logo = models.ImageField(
        upload_to='images/link_page', blank=True, null=True)
    description = models.TextField(blank=True)
    url = models.URLField(blank=True)

    def __str__(self):
        return self.title
