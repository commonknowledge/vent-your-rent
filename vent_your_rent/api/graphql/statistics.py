import graphene
from vent_your_rent.api.data.rentermanifesto_stats import rentermanifesto_stats_for_constituency_id, rentermanifesto_stats_for_admin_district
from vent_your_rent.api.engine.geo import constituency_id_from_geo
from .geo import GeocodeResult


class PostcodeStatistics(graphene.ObjectType):
    geo = graphene.NonNull(GeocodeResult)

    devolved_nation = graphene.Boolean(
        description="Postcode is in a devolved administration and we therefore do not have rental data for it")

    # Constituency stats (name: geo.parliamentary_constituency)
    constituency_id = graphene.String(required=True)
    constituency_name = graphene.String(required=True)

    prs_size = graphene.Int()
    wage_to_house_price = graphene.Float()
    uc_housing = graphene.Int()
    housing_perc_on_uc = graphene.Float()
    total_hb_incl_social = graphene.Int()
    prs_households_2011 = graphene.Int()
    perc_regional_increase_in_prs = graphene.Float()
    prs_households_2018_estimate = graphene.Int()
    estimated_uk_ire_citizens = graphene.Float()
    majority = graphene.Int()
    unregistered_private_renter_voters = graphene.Int()
    size_of_impact = graphene.Float()

    # Admin district stats (name: geo.admin_district)
    admin_district_id = graphene.String(required=True)
    admin_district_name = graphene.String(required=True)
    # House prices in this admin_district
    buy_lqValue1Bed = graphene.Float()
    buy_medianValue1Bed = graphene.Float()
    buy_uqValue1Bed = graphene.Float()
    buy_lqValue2Bed = graphene.Float()
    buy_medianValue2Bed = graphene.Float()
    buy_uqValue2Bed = graphene.Float()
    buy_lqValue3Bed = graphene.Float()
    buy_medianValue3Bed = graphene.Float()
    buy_uqValue3Bed = graphene.Float()
    buy_lqValue4Bed = graphene.Float()
    buy_medianValue4Bed = graphene.Float()
    buy_uqValue4Bed = graphene.Float()
    # Rent prices in this admin_district
    rent_lqValue1Bed = graphene.Float()
    rent_medianValue1Bed = graphene.Float()
    rent_uqValue1Bed = graphene.Float()
    rent_lqValue2Bed = graphene.Float()
    rent_medianValue2Bed = graphene.Float()
    rent_uqValue2Bed = graphene.Float()
    rent_lqValue3Bed = graphene.Float()
    rent_medianValue3Bed = graphene.Float()
    rent_uqValue3Bed = graphene.Float()
    rent_lqValue4Bed = graphene.Float()
    rent_medianValue4Bed = graphene.Float()
    rent_uqValue4Bed = graphene.Float()
    # Homeless data
    no_fault_eviction_homelessness_cases_per_1000 = graphene.Int()
    median_rent_on_2_bed_flat = graphene.Int()

    # Assorted census data.
    # Every data point here has a CON(stituency), REG(ional), CTRY-wide average.
    RegionID = graphene.String(description="Name of region")
    RegionName = graphene.String(description="Name of region")
    CONLevelAll = graphene.Float(description="All households in the constituency")
    CONPercAll = graphene.Float(description="Perc of households in the constituency that are in a household tenure")
    REGLevelAll = graphene.Float(description="All households in the region")
    RegPercAll = graphene.Float(description="Perc of households in the region that are in a household tenure")
    CTRYLevelAll = graphene.Float(description="All households in the country")
    CTRYPercAll = graphene.Float(description="Perc of households in the country that are in a household tenure")
    CONLevelOwn = graphene.Float(description="Households in the constituency that own their accommodation")
    CONPercOwn = graphene.Float(description="Perc of households in the constituency that own their accommodation")
    REGLevelOwn = graphene.Float(description="Households in the region that own their accommodation")
    REGPercOwn = graphene.Float(description="Perc of households in the region that own their accommodation")
    CTRYLevelOwn = graphene.Float(description="Households in the country that own their accommodation")
    CTRYPercOwn = graphene.Float(description="Perc of households in the country that own their accommodation")
    CONLevelOwn_out = graphene.Float(description="Households in the constituency that own their accommodation outright")
    CONPercOwn_out = graphene.Float(
        description="Perc of households in the constituency that own their accommodation outright")
    REGLevelOwn_out = graphene.Float(description="Households in the region that own their accommodation outright")
    REGPercOwn_out = graphene.Float(
        description="Perc of households in the region that own their accommodation outright")
    CTRYLevelOwn_out = graphene.Float(description="Households in the country that own their accommodation outright")
    CTRYPercOwn_out = graphene.Float(
        description="Perc of households in the country that own their accommodation outright")
    CONLevelOwn_mort = graphene.Float(
        description="Households in the constituency that own their accommodation with a mortgage or loan")
    CONPercOwn_mort = graphene.Float(
        description="Perc of households in the constituency that own their accommodation with a mortgage or loan")
    REGLevelOwn_mort = graphene.Float(
        description="Households in the region that own their accommodation with a mortgage or loan")
    REGPercOwn_mort = graphene.Float(
        description="Perc of households in the region that own their accommodation with a mortgage or loan")
    CTRYLevelOwn_mort = graphene.Float(
        description="Households in the country that own their accommodation with a mortgage or loan")
    CTRYPercOwn_mort = graphene.Float(
        description="Perc of households in the country that own their accommodation with a mortgage or loan")
    CONLevelShare = graphene.Float(
        description="Households in the constituency that are in shared ownership (part owned and part rented)")
    CONPercShare = graphene.Float(
        description="Perc of households in the constituency that are in shared ownership (part owned and part rented)")
    REGLevelShare = graphene.Float(
        description="Households in the region that are in shared ownership (part owned and part rented)")
    REGPercShare = graphene.Float(
        description="Perc of households in the region that are in shared ownership (part owned and part rented)")
    CTRYLevelShare = graphene.Float(
        description="Households in the country that are in shared ownership (part owned and part rented)")
    CTRYPercShare = graphene.Float(
        description="Perc of households in the country that are in shared ownership (part owned and part rented)")
    CONLevelSoc_r = graphene.Float(description="Households in the constituency that are in social rented accommodation")
    CONPercSoc_r = graphene.Float(
        description="Perc of households in the constituency that are in social rented accommodation")
    REGLevelSoc_r = graphene.Float(description="Households in the region that are in social rented accommodation")
    REGPercSoc_r = graphene.Float(
        description="Perc of households in the region that are in social rented accommodation")
    CTRYLevelSoc_r = graphene.Float(description="Households in the country that are in social rented accommodation")
    CTRYPercSoc_r = graphene.Float(
        description="Perc of households in the country that are in social rented accommodation")
    CONLevelSoc_r_LA = graphene.Float(
        description="Households in the constituency that are in accommodation rented from council (local authority)")
    CONPercSoc_r_LA = graphene.Float(
        description="Perc of households in the constituency that are in accommodation rented from council (local authority)")
    REGLevelSoc_r_LA = graphene.Float(
        description="Households in the region that are in accommodation rented from council (local authority)")
    REGPercSoc_r_LA = graphene.Float(
        description="Perc of households in the region that are in accommodation rented from council (local authority)")
    CTRYLevelSoc_r_LA = graphene.Float(
        description="Households in the country that are in accommodation rented from council (local authority)")
    CTRYPercSoc_r_LA = graphene.Float(
        description="Perc of households in the country that are in accommodation rented from council (local authority)")
    CONLevelSoc_r_Other = graphene.Float(
        description="Households in the constituency that are in social rented accommodation, not rented from council")
    CONPercSoc_r_Other = graphene.Float(
        description="Perc of households in the constituency that are in social rented accommodation, not rented from council")
    REGLevelSoc_r_Other = graphene.Float(
        description="Households in the region that are in social rented accommodation, not rented from council")
    REGPercSoc_r_Other = graphene.Float(
        description="Perc of households in the region that are in social rented accommodation, not rented from council")
    CTRYLevelSoc_r_Other = graphene.Float(
        description="Households in the country that are in social rented accommodation, not rented from council")
    CTRYPercSoc_r_Other = graphene.Float(
        description="Perc of households in the country that are in social rented accommodation, not rented from council")
    CONLevelPrivate_rent = graphene.Float(
        description="Households in the constituency that are in private rented accommodation")
    CONPercPrivate_rent = graphene.Float(
        description="Perc of households in the constituency that are in private rented accommodation")
    REGLevelPrivate_rent = graphene.Float(
        description="Households in the region that are in private rented accommodation")
    REGPercPrivate_rent = graphene.Float(
        description="Perc of households in the region that are in private rented accommodation")
    CTRYLevelPrivate_rent = graphene.Float(
        description="Households in the country that are in private rented accommodation")
    CTRYPercPrivate_rent = graphene.Float(
        description="Perc of households in the country that are in private rented accommodation")
    CONLevelPrivate_r_land = graphene.Float(
        description="Households in the constituency that are in accommodation privately rented from a private landlord or letting agency")
    CONPercPrivate_r_land = graphene.Float(
        description="Perc of households in the constituency that are in accommodation privately rented from a private landlord or letting agency")
    REGLevelPrivate_r_land = graphene.Float(
        description="Households in the region that are in accommodation privately rented from a private landlord or letting agency")
    REGPercPrivate_r_land = graphene.Float(
        description="Perc of households in the region that are in accommodation privately rented from a private landlord or letting agency")
    CTRYLevelPrivate_r_land = graphene.Float(
        description="Households in the country that are in accommodation privately rented from a private landlord or letting agency")
    CTRYPercPrivate_r_land = graphene.Float(
        description="Perc of households in the country that are in accommodation privately rented from a private landlord or letting agency")
    CONLevelPrivate_r_Oth = graphene.Float(
        description="Households in the constituency that are in accommodation privately rented from: an employer of a houshold member; a relative or friend of household member; or, other")
    CONPercPrivate_r_Oth = graphene.Float(
        description="Perc of households in the constituency that are in accommodation privately rented from: an employer of a houshold member; a relative or friend of household member; or, other")
    REGLevelPrivate_r_Oth = graphene.Float(
        description="Households in the region that are in accommodation privately rented from: an employer of a houshold member; a relative or friend of household member; or, other")
    REGPercPrivate_r_Oth = graphene.Float(
        description="Perc of households in the region that are in accommodation privately rented from: an employer of a houshold member; a relative or friend of household member; or, other")
    CTRYLevelPrivate_r_Oth = graphene.Float(
        description="Households in the country that are in accommodation privately rented from: an employer of a houshold member; a relative or friend of household member; or, other")
    CTRYPercPrivate_r_Oth = graphene.Float(
        description="Perc of households in the country that are in accommodation privately rented from: an employer of a houshold member; a relative or friend of household member; or, other")
    CONLevelRent_free = graphene.Float(description="Households in the constituency that are living rent free")
    CONPercRent_free = graphene.Float(description="Perc of households in the constituency that are living rent free")
    REGLevelRent_free = graphene.Float(description="Households in the region that are living rent free")
    REGPercRent_free = graphene.Float(description="Perc of households in the region that are living rent free")
    CTRYLevelRent_free = graphene.Float(description="Households in the country that are living rent free")
    CTRYPercRent_free = graphene.Float(description="Perc of households in the country that are living rent free")


def get_constituency_stats(geo):
    admin_district_id = geo.get('codes').get('admin_district')

    if (geo.get('country') != 'England'):
        return {
            "constituency_id": geo.get('codes').get('parliamentary_constituency'),
            "constituency_name": geo.get('parliamentary_constituency'),
            "admin_district_id": admin_district_id,
            "admin_district_name": geo.get("admin_district"),
            "geo": geo,
            "devolved_nation": True
        }

    admin_district_data = rentermanifesto_stats_for_admin_district(admin_district_id)

    constituency_id = geo.get('codes').get('parliamentary_constituency')
    constituency_data = rentermanifesto_stats_for_constituency_id(constituency_id)

    return {
        **admin_district_data,
        "admin_district_id": admin_district_id,
        "admin_district_name": admin_district_data.get("name"),
        **constituency_data,
        "geo": geo,
        "devolved_nation": False
    }


class Queries():
    statistics_for_postcode = graphene.Field(graphene.NonNull(PostcodeStatistics),
                                             postcode=graphene.String(required=True))

    def resolve_statistics_for_postcode(self, info, postcode):
        return info.context.loaders.get("geo_from_postcode").load(postcode).then(get_constituency_stats)


class Mutations():
    pass
