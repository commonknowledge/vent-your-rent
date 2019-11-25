import graphene
from vent_your_rent.api.engine.geo import postcode_geo


class GeoCodes(graphene.ObjectType):
    admin_district = graphene.String(required=True)
    admin_county = graphene.String(required=True)
    admin_ward = graphene.String(required=True)
    parish = graphene.String(required=True)
    parliamentary_constituency = graphene.String(required=True)
    ccg = graphene.String(required=True)
    ced = graphene.String(required=True)
    nuts = graphene.String(required=True)


class GeocodeResult(graphene.ObjectType):
    country = graphene.String(required=True)
    european_electoral_region = graphene.String(required=True)
    region = graphene.String(required=False)
    parliamentary_constituency = graphene.String(required=True)


class Queries():
    geo_by_postcode = graphene.Field(GeocodeResult, postcode=graphene.String(required=True))

    def resolve_geo_by_postcode(self, info, postcode):
        return postcode_geo(postcode)
