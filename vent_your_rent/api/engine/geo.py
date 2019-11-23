import requests
from vent_your_rent.api.helpers.utils import get, get_path, batch_and_aggregate
from vent_your_rent.api.helpers.cache import cached_fn
from django.core.cache import cache
import os

def postcode_geo(postcode: str):
    response = requests.get(f'https://api.postcodes.io/postcodes/{postcode}')
    data = response.json()
    status = get(data, 'status')
    result = get(data, 'result')

    if status is not 200 or result is None:
        raise Exception(f'Failed to geocode postcode: {postcode}.')

    return result

@batch_and_aggregate(100)
def bulk_postcode_geo(postcodes):
    response = requests.post(f'https://api.postcodes.io/postcodes', data={
        "postcodes": postcodes
    })
    data = response.json()
    status = get(data, 'status')
    result = get(data, 'result')

    if status is not 200 or result is None:
        raise Exception(f'Failed to bulk geocode postcodes: {postcodes}.')

    return result


@batch_and_aggregate(25)
def bulk_coordinate_geo(coordinates):
    for i, coords in enumerate(coordinates):
        coordinates[i]["limit"] = 1

    payload = {
        "geolocations": coordinates
    }

    response = requests.post(f'https://api.postcodes.io/postcodes', data=payload)
    data = response.json()
    status = get(data, 'status')
    result = get(data, 'result')

    if status is not 200 or result is None:
        raise Exception(f'Failed to bulk geocode coordinates: {payload}')

    return result

def coordinates_geo(latitude: float, longitude: float):
    response = requests.get(
        f'https://api.postcodes.io/postcodes?lon={longitude}&lat={latitude}')
    data = response.json()
    status = get(data, 'status')
    result = get(data, 'result')

    if status is not 200 or result is None or len(result) < 1:
        raise Exception(
            f'Failed to get postcode for coordinates: lon={longitude}&lat={latitude}.')

    return result[0]

def constituency_id_from_geo(geo):
    return get_path(geo, 'codes', 'parliamentary_constituency')

def constituency_id_by_postcode(postcode: str) -> str:
    geo = postcode_geo(postcode)
    return constituency_id_from_geo(geo)

class TransportModes():
    driving = "driving"
    walking = "walking"
    bicycling = "bicycling"
    transit = "transit"

def get_approximate_postcode_locations(postcodes):
    '''
    Increase frequency of distance matrix cache hits by lowering precision of locations
    '''

    def approximate_location(coordinate):
        # 0.01 degrees distance on both long and lat == about a 20 minute walk in the uk
        return {
            "latitude": round(get_path(coordinate, 'result', 'latitude'), 2),
            "longitude": round(get_path(coordinate, 'result', 'longitude'), 2)
        }

    return map(approximate_location, bulk_postcode_geo(postcodes))


def postcode_components(g):
    return [t for t in g.get('address_components') if 'postal_code' in t.get('types')]

def geo_by_address(address: str):
    params = {
        "key": os.getenv('GOOGLE_MAPS_API_KEY'),
        "components": 'country:' + os.getenv('CCTLD'),
        "address": address
    }
    res = requests.get(f'https://maps.googleapis.com/maps/api/geocode/json?', params=params)
    data = res.json()
    postcoded_geos = [g for g in data.get('results') if len(postcode_components(g))]
    if len(postcoded_geos) == 0:
        return {}
    geo = postcoded_geos[0]
    return {
        'address': geo.get('formatted_address'),
        'postcode': postcode_components(geo)[0].get('short_name'),
        'latitude': float(geo.get('geometry').get('location').get('lat')),
        'longitude': float(geo.get('geometry').get('location').get('lng'))
    }

'''
output {
    "status" : "OK",
    "destination_addresses" : [ "New York, NY, USA" ],
    "origin_addresses" : [ "Washington, DC, USA" ],
    "rows" : [
        {
            "elements" : [
                {
                    "distance" : {
                        "text" : "225 mi",
                        "value" : 361715
                    },
                    "duration" : {
                        "text" : "3 hours 49 mins",
                        "value" : 13725
                    },
                    "status" : "OK"
                }
            ]
        }
    ]
}
'''
