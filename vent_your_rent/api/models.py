from django.db import models
import os
from django.utils.timezone import now
import uuid

# Create your models here.


def generate_upload_destination_path(instance, filename):
    filename_base, filename_ext = os.path.splitext(filename)
    return 'vents/%s%s%s' % (
        now().strftime("%Y%m%d%H%M%S"),
        uuid.uuid1(),
        filename_ext.lower(),
    )


class Vent(models.Model):
    # user submitted
    first_name = models.CharField(null=False, blank=False, max_length=200)
    postcode = models.CharField(null=False, blank=False, max_length=12)
    caption = models.TextField(null=False, blank=False)
    image = models.ImageField(null=True, blank=True, upload_to=generate_upload_destination_path)
    emoji = models.CharField(null=True, blank=True, max_length=50)
    # admin
    is_published = models.BooleanField(null=True, blank=True, default=False)
    # auto
    date_created = models.DateTimeField(null=True, blank=True, auto_now_add=True)


class Signup(models.Model):
    # user submitted
    first_name = models.CharField(null=False, blank=False, max_length=200)
    last_name = models.CharField(null=False, blank=False, max_length=200)
    postcode = models.CharField(null=False, blank=False, max_length=12)
    email = models.EmailField(null=False, blank=False, max_length=300)
    can_contact = models.BooleanField(null=True, blank=True)
    # 2020 survey data
    IncomeFell = models.BooleanField(null=True, blank=True)
    FullPay = models.BooleanField(null=True, blank=True)
    CannotGetUC = models.BooleanField(null=True, blank=True)
    CannotGetFurlough = models.BooleanField(null=True, blank=True)
    UCDoesntCoverRent = models.BooleanField(null=True, blank=True)
    AskedToMoveOut = models.BooleanField(null=True, blank=True)
    RentHolidayOrReduction = models.BooleanField(null=True, blank=True)
    CantMove = models.BooleanField(null=True, blank=True)
    Overcrowded = models.BooleanField(null=True, blank=True)
    UnfitToLiveIn = models.BooleanField(null=True, blank=True)
    HousingOK = models.BooleanField(null=True, blank=True)
    # auto
    date_created = models.DateTimeField(null=True, blank=True, auto_now_add=True)
