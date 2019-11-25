from vent_your_rent.api.helpers.cache import cached_fn
from vent_your_rent.api.data.csv import read_csv, cached_read_csv
from .constituency_housing_data import data as constituency_data
from .constituency_census_data import data as census_data
from .borough_renting_data import data as borough_data

# TODO: @cached_fn(lambda key: key, None)
def rentermanifesto_stats_for_constituency_id(constituency_id):
    return {
        **list(filter(lambda c: c.get('constituency_id') == constituency_id, constituency_data))[0],
        **list(filter(lambda c: c.get('ONSConstID') == constituency_id, census_data))[0],
    }

# TODO: @cached_fn(lambda key: key, None)
def rentermanifesto_stats_for_admin_district(admin_district):
    return borough_data.get(admin_district)