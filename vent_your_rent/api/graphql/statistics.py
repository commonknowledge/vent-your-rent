import graphene
from vent_your_rent.api.data.rentermanifesto_stats import rentermanifesto_stats_for_constituency_id
from vent_your_rent.api.engine.geo import constituency_id_from_geo 
from .geo import GeocodeResult

class PostcodeStatistics(graphene.ObjectType):
    geo = graphene.NonNull(GeocodeResult)
    constituency_id = graphene.String(required=True)
    constituency_name = graphene.String(required=True)
    prs_size = graphene.Float(required=False)
    wage_to_house_price = graphene.Float(required=False)
    uc_housing = graphene.Int(required=False)
    housing_perc_on_uc = graphene.Float(required=False)
    total_hb_incl_social = graphene.Int(required=False)
    majority = graphene.Int(required=False)
    
def get_constituency_stats(geo):
    id = constituency_id_from_geo(geo)
    rentermanifesto_stats = rentermanifesto_stats_for_constituency_id(id)

    return {
        **rentermanifesto_stats,
        "geo": geo
    }

class Queries():
    statistics_for_postcode = graphene.Field(graphene.NonNull(PostcodeStatistics),
                                                postcode=graphene.String(required=True))

    def resolve_statistics_for_postcode(self, info, postcode):
        return info.context.loaders.get("geo_from_postcode").load(postcode).then(get_constituency_stats)

class Mutations():
    pass