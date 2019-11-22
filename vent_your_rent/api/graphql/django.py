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

class VentType(DjangoObjectType):
    class Meta:
        model = Vent
        filter_fields = ['postcode']
        fields = '__all__'

    location = GeocodeResult()

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
    vents = DjangoFilterField(VentType)

class Mutations():
    create_vent = VentMutation.Field()
