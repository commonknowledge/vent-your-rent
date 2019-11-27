from vent_your_rent.api.helpers.cache import cached_fn
from vent_your_rent.api.data.csv import read_csv, cached_read_csv
from .constituency_housing_data import data as constituency_data
from .constituency_census_data import data as census_data
from .constituency_voter_registration_data import data as voter_reg_data
from .borough_renting_data import data as borough_renting_data
from .borough_homelessness_data import data as borough_homelessness_data

# TODO: @cached_fn(lambda key: key, None)
def rentermanifesto_stats_for_constituency_id(constituency_id):
    return {
        **find(constituency_data,
            lambda c: c.get('constituency_id') == constituency_id),
        **find(census_data,
            lambda c: c.get('ONSConstID') == constituency_id),
        **find(voter_reg_data,
            lambda c: c.get('PCON11CD') == constituency_id)
    }

# TODO: @cached_fn(lambda key: key, None)
def rentermanifesto_stats_for_admin_district(admin_district):
    return {
        **borough_renting_data.get(admin_district),
        **find(borough_homelessness_data,
            lambda c: c.get('geography_code') == admin_district)
    }

def find(arr, matcher):
    return list(filter(matcher, arr))[0]