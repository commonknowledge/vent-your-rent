import graphene
from vent_your_rent.api.data.rentermanifesto_stats import rentermanifesto_stats_for_constituency_id, rentermanifesto_stats_for_admin_district
from vent_your_rent.api.engine.geo import constituency_id_from_geo 
from .geo import GeocodeResult

class PostcodeStatistics(graphene.ObjectType):
    geo = graphene.NonNull(GeocodeResult)

    # Admin district stats (name: geo.parliamentary_constituency)
    constituency_id = graphene.String(required=True)
    constituency_name = graphene.String(required=True)

    prs_size = graphene.Float(required=False)
    wage_to_house_price = graphene.Float(required=False)
    uc_housing = graphene.Int(required=False)
    housing_perc_on_uc = graphene.Float(required=False)
    total_hb_incl_social = graphene.Int(required=False)
    majority = graphene.Int(required=False)

    # Admin district stats (name: geo.admin_district)
    admin_district_id = graphene.String(required=True)
    admin_district_name = graphene.String(required=True)

    buy_lqValue1Bed = graphene.Float(required=True)
    buy_medianValue1Bed = graphene.Float(required=True)
    buy_uqValue1Bed = graphene.Float(required=True)
    buy_lqValue2Bed = graphene.Float(required=True)
    buy_medianValue2Bed = graphene.Float(required=True)
    buy_uqValue2Bed = graphene.Float(required=True)
    buy_lqValue3Bed = graphene.Float(required=True)
    buy_medianValue3Bed = graphene.Float(required=True)
    buy_uqValue3Bed = graphene.Float(required=True)
    buy_lqValue4Bed = graphene.Float(required=True)
    buy_medianValue4Bed = graphene.Float(required=True)
    buy_uqValue4Bed = graphene.Float(required=True)
    rent_lqValue1Bed = graphene.Float(required=True)
    rent_medianValue1Bed = graphene.Float(required=True)
    rent_uqValue1Bed = graphene.Float(required=True)
    rent_lqValue2Bed = graphene.Float(required=True)
    rent_medianValue2Bed = graphene.Float(required=True)
    rent_uqValue2Bed = graphene.Float(required=True)
    rent_lqValue3Bed = graphene.Float(required=True)
    rent_medianValue3Bed = graphene.Float(required=True)
    rent_uqValue3Bed = graphene.Float(required=True)
    rent_lqValue4Bed = graphene.Float(required=True)
    rent_medianValue4Bed = graphene.Float(required=True)
    rent_uqValue4Bed = graphene.Float(required=True)
    
def get_constituency_stats(geo):
    admin_district_code = geo.get('codes').get('admin_district')
    admin_district_data = rentermanifesto_stats_for_admin_district(admin_district_code)

    return {
        **admin_district_data,
        **rentermanifesto_stats_for_constituency_id(geo.get('codes').get('parliamentary_constituency')),
        "admin_district_id": admin_district_code,
        "admin_district_name": admin_district_data.get("name"),
        "geo": geo
    }

class Queries():
    statistics_for_postcode = graphene.Field(graphene.NonNull(PostcodeStatistics),
                                                postcode=graphene.String(required=True))

    def resolve_statistics_for_postcode(self, info, postcode):
        return info.context.loaders.get("geo_from_postcode").load(postcode).then(get_constituency_stats)

class Mutations():
    pass