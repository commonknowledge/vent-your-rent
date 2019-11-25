from vent_your_rent.api.data.csv import read_csv, cached_read_csv
from .constituency_housing_data import data as constituency_data
from .borough_renting_data import data as borough_data

def rentermanifesto_stats_for_constituency_id(constituency_id):
    return [
        c for c in constituency_data if c.get('constituency_id') == constituency_id
    ][0]

def rentermanifesto_stats_for_admin_district(admin_district):
    return borough_data.get(admin_district)