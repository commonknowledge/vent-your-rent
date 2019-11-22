from vent_your_rent.api.helpers.proxy import proxy_request
import json
import os
import urllib.parse

def autocomplete(request, search):
    qs = urllib.parse.urlencode({
        "key": os.getenv('GOOGLE_MAPS_API_KEY'),
        "components": 'country:' + os.getenv('CCTLD'),
        # "type": "address",
        "input": search
    })
    res = proxy_request(f'https://maps.googleapis.com/maps/api/place/autocomplete/json?{qs}')
    return res