import graphene
from vent_your_rent.api.engine.geo import postcode_geo

class Coordinates(graphene.ObjectType):
    longitude = graphene.Float(required=True)
    latitude = graphene.Float(required=True)


class GeoCodes(graphene.ObjectType):
    admin_district = graphene.String(required=True)
    admin_county = graphene.String(required=True)
    admin_ward = graphene.String(required=True)
    parish = graphene.String(required=True)
    parliamentary_constituency = graphene.String(required=True)
    ccg = graphene.String(required=True)
    ced = graphene.String(required=True)
    nuts = graphene.String(required=True)


class GeocodeResult(Coordinates):
    postcode = graphene.String(required=True)
    quality = graphene.Int(required=True)
    eastings = graphene.Int(required=True)
    northings = graphene.Int(required=True)
    country = graphene.String(required=True)
    nhs_ha = graphene.String(required=True)
    european_electoral_region = graphene.String(required=True)
    primary_care_trust = graphene.String(required=True)
    region = graphene.String(required=False)
    lsoa = graphene.String(required=True)
    msoa = graphene.String(required=True)
    incode = graphene.String(required=True)
    outcode = graphene.String(required=True)
    parliamentary_constituency = graphene.String(required=True)
    admin_district = graphene.String(required=True)
    parish = graphene.String(required=True)
    admin_ward = graphene.String(required=True)
    ccg = graphene.String(required=True)
    nuts = graphene.String(required=True)
    codes = graphene.NonNull(GeoCodes)


class Queries():
    geo_by_postcode = graphene.Field(GeocodeResult, postcode=graphene.String(required=True))

    def resolve_geo_by_postcode(self, info, postcode):
        return postcode_geo(postcode)
