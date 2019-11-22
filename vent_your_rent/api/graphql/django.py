import graphene
from graphene_django.types import DjangoObjectType
from django import forms
from django.db.models import Q
from graphene_django.forms.mutation import DjangoModelFormMutation
from .utils import DjangoFilterField
from .geo import GeocodeResult
from vent_your_rent.api.helpers.utils import get, get_path
from vent_your_rent.api.helpers.cache import cached_fn
from vent_your_rent.api.models import Vent
from django.utils import timezone
from datetime import datetime  
from datetime import timedelta  
from graphene.types.generic import GenericScalar
import itertools
import random

class VentType(DjangoObjectType):
    class Meta:
        model = Vent
        filter_fields = ['postcode']
        fields = '__all__'

    location = graphene.Field(GeocodeResult)

    def resolve_location(self, info):
        return info.context.loaders.get('geo_from_postcode').load(self.postcode)

class VentForm(forms.ModelForm):
    class Meta:
        model = Vent
        fields = ('first_name', 'caption', 'image', 'postcode',)

class VentMutation(DjangoModelFormMutation):
    vent = graphene.Field(VentType)

    class Meta:
        form_class = VentForm

class Queries():
    vents = graphene.List(graphene.NonNull(VentType), required=True) # DjangoFilterField(VentType)

    def resolve_vents(self, info):
        vents = []
        n = 1
        for _ in itertools.repeat(None, 40):
            vents.append(Vent(
                id=n,
                postcode=random.choice(["LL47 6YP", "PH38 4LZ", "W5 3PB", "PA29 6TB", "TN26 1AJ"]),
                caption=random.choice(["I hate my landlord", "Never met my landlord", "is this hell on earth"]),
                first_name=random.choice(["Alex", "Gemma", "Georgie", "Dan", "Jan"])
            ))
            n = n + 1
        return vents

    vent = graphene.Field(VentType, id=graphene.String(required=True))

    def resolve_vent(self, info, id):
        return Vent(
            id=n,
            postcode=random.choice(["LL47 6YP", "PH38 4LZ", "W5 3PB", "PA29 6TB", "TN26 1AJ"]),
            caption=random.choice(["I hate my landlord", "Never met my landlord", "is this hell on earth"]),
            first_name=random.choice(["Alex", "Gemma", "Georgie", "Dan", "Jan"])
        )

class Mutations():
    create_vent = VentMutation.Field()
