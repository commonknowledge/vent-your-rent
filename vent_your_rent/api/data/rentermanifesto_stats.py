from vent_your_rent.api.data.csv import read_csv, cached_read_csv
from .constituency_housing_data import data

def rentermanifesto_stats_for_constituency_id(constituency_id):
    return [
        c for c in data if c.get('constituency_id') == constituency_id
    ][0]