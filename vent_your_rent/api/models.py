from django.db import models

# Create your models here.

class Vent(models.Model):
    # user submitted
    first_name = models.CharField(null=False, blank=False, max_length=100)
    postcode = models.CharField(null=False, blank=False, max_length=12)
    caption = models.TextField(null=False, blank=False)
    image = models.ImageField(null=False, blank=False)
    # auto
    date_created = models.DateTimeField(null=True, blank=True, auto_now_add=True)