from django.db import models
import os
from django.utils.timezone import now

# Create your models here.

def generate_upload_destination_path(instance, filename):
    filename_base, filename_ext = os.path.splitext(filename)
    return 'vents/%s%s' % (
        now().strftime("%Y%m%d%H%M%S"),
        filename_ext.lower(),
    )

class Vent(models.Model):
    # user submitted
    first_name = models.CharField(null=False, blank=False, max_length=100)
    postcode = models.CharField(null=False, blank=False, max_length=12)
    caption = models.TextField(null=False, blank=False)
    image = models.ImageField(null=False, blank=False, upload_to=generate_upload_destination_path)
    # admin
    is_published = models.BooleanField(null=True, blank=True, default=False)
    # auto
    date_created = models.DateTimeField(null=True, blank=True, auto_now_add=True)