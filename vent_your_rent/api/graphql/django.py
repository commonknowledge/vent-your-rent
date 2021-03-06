import graphene
from graphene_django.types import DjangoObjectType
from django import forms
from django.db.models import Q
from graphene_django.forms.mutation import DjangoModelFormMutation
from .utils import DjangoFilterField
from .geo import GeocodeResult
from vent_your_rent.api.helpers.utils import get, get_path
from vent_your_rent.api.helpers.cache import cached_fn
from vent_your_rent.api.models import Vent, Signup
from django.utils import timezone
from datetime import datetime
from datetime import timedelta
from graphene.types.generic import GenericScalar
import itertools
import random
from graphene_file_upload.scalars import Upload

###


class SignupType(DjangoObjectType):
    class Meta:
        model = Signup


class SignupMutation(graphene.Mutation):
    class Arguments:
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)
        postcode = graphene.String(required=True)
        email = graphene.String(required=True)
        can_contact = graphene.Boolean()
        IncomeFell = graphene.Boolean()
        FullPay = graphene.Boolean()
        CannotGetUC = graphene.Boolean()
        CannotGetFurlough = graphene.Boolean()
        UCDoesntCoverRent = graphene.Boolean()
        AskedToMoveOut = graphene.Boolean()
        RentHolidayOrReduction = graphene.Boolean()
        CantMove = graphene.Boolean()
        Overcrowded = graphene.Boolean()
        UnfitToLiveIn = graphene.Boolean()
        HousingOK = graphene.Boolean()

    signup = graphene.Field(SignupType)
    success = graphene.Boolean(required=True)

    def mutate(self, info,
               first_name=None,
               last_name=None,
               postcode=None,
               email=None,
               can_contact=False,
               IncomeFell=False,
               FullPay=False,
               CannotGetUC=False,
               CannotGetFurlough=False,
               UCDoesntCoverRent=False,
               AskedToMoveOut=False,
               RentHolidayOrReduction=False,
               CantMove=False,
               Overcrowded=False,
               UnfitToLiveIn=False,
               HousingOK=False,
               ):
        signup = Signup.objects.create(
            first_name=first_name,
            last_name=last_name,
            postcode=postcode,
            email=email,
            can_contact=can_contact,
            IncomeFell=IncomeFell,
            FullPay=FullPay,
            CannotGetUC=CannotGetUC,
            CannotGetFurlough=CannotGetFurlough,
            UCDoesntCoverRent=UCDoesntCoverRent,
            AskedToMoveOut=AskedToMoveOut,
            RentHolidayOrReduction=RentHolidayOrReduction,
            CantMove=CantMove,
            Overcrowded=Overcrowded,
            UnfitToLiveIn=UnfitToLiveIn,
            HousingOK=HousingOK
        )

        return SignupMutation(success=True, signup=signup)

###


class VentType(DjangoObjectType):
    class Meta:
        model = Vent
        filter_fields = ['postcode']
        exclude = ['postcode']

    def resolve_image(self, info):
        try:
            return None if self.image is None else self.image.url
        except:
            return None

    geo = graphene.Field(GeocodeResult, required=False)

    def resolve_geo(self, info):
        return info.context.loaders.get('geo_from_postcode').load(self.postcode)


class VentMutation(graphene.Mutation):
    class Arguments:
        caption = graphene.String(required=True)
        first_name = graphene.String(required=True)
        postcode = graphene.String(required=True)
        image = Upload()
        emoji = graphene.String(required=False)

    success = graphene.Boolean()
    vent = graphene.Field(VentType)

    def mutate(self, info, caption=None, first_name=None, postcode=None, image=None, emoji=None):
        vent = Vent.objects.create(
            caption=caption,
            first_name=first_name,
            postcode=postcode,
            image=image,
            emoji=emoji
        )

        return VentMutation(success=True, vent=vent)


class Queries():
    # production
    vents_count = graphene.Int(required=True)

    @cached_fn('vents_count', 1)
    def resolve_vents_count(self, info):
        return Vent.objects.count()

    vents = graphene.List(graphene.NonNull(VentType), required=True,
                          quantity=graphene.Int(default_value=3),
                          ventIds=graphene.List(graphene.NonNull(graphene.Int), required=False)
                          )  # DjangoFilterField(VentType)

    def resolve_vents(self, info, quantity=3, ventIds=[]):
        return Vent.objects.filter(
            Q(is_published=True) | Q(id__in=ventIds)
        ).order_by('-date_created')[:quantity]

    all_vents = graphene.List(graphene.NonNull(VentType), required=True,
                              quantity=graphene.Int(default_value=3),
                              ventIds=graphene.List(graphene.NonNull(graphene.Int), required=False)
                              )  # DjangoFilterField(VentType)

    def resolve_all_vents(self, info, quantity=3, ventIds=[]):
        return Vent.objects.order_by('-date_created')[:quantity]

    vent = graphene.Field(VentType, id=graphene.String(required=True))

    def resolve_vent(self, info, id):
        return Vent.objects.get(id=id)

    # mocks

    mock_vents = graphene.List(graphene.NonNull(VentType), required=True,
                               quantity=graphene.Int(default_value=3))  # DjangoFilterField(VentType)

    def resolve_mock_vents(self, info, quantity=3):
        vents = []
        n = 1
        for _ in itertools.repeat(None, quantity):
            vents.append(Vent(
                id=n,
                postcode=random.choice(["LL47 6YP", "PH38 4LZ", "W5 3PB", "PA29 6TB", "TN26 1AJ"]),
                caption=random.choice(["I hate my landlord", "Never met my landlord", "is this hell on earth"]),
                first_name=random.choice(["Alex", "Gemma", "Georgie", "Dan", "Jan"])
            ))
            n = n + 1
        return vents

    mock_vent = graphene.Field(VentType, id=graphene.String(required=True))

    def resolve_mock_vent(self, info, id):
        return Vent(
            id=id,
            postcode=random.choice(["LL47 6YP", "PH38 4LZ", "W5 3PB", "PA29 6TB", "TN26 1AJ"]),
            caption=random.choice(["I hate my landlord", "Never met my landlord", "is this hell on earth"]),
            first_name=random.choice(["Alex", "Gemma", "Georgie", "Dan", "Jan"])
        )


class Mutations():
    create_vent = VentMutation.Field()
    signup = SignupMutation.Field()
