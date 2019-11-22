"""
NationBuilder data from Momentum is provided as an abstract set of functions
"""
import json
import requests
from from vent_your_rent.api.helpers.utils import get
from from vent_your_rent.api.helpers.cache import cached_fn
import os
import numpy as np
from .geo import postcode_geo

# TODO: Move to env
nation_slug = os.getenv('NATIONBUILDER_NATION_SLUG')
# TODO: Create NB bot author with NationBuilder
# author_id = '390316'
baseurl = f'https://{nation_slug}.nationbuilder.com/api/v1'
access_token = os.getenv('NATIONBUILDER_ACCESS_TOKEN')

# utils


def nb_formatted_date(date) -> str:
    np_date = np.datetime64(date)
    return np_date.astype('datetime64[D]')


def nb_request(method: str, url: str, params={}, headers={}, **kwargs):
    params["access_token"] = access_token
    params['format'] = 'json'
    headers["access_token"] = access_token
    headers['content-type'] = 'application/json'
    headers['Accept'] = 'application/json'
    res = get(requests, method)(url, params=params, headers=headers, **kwargs)
    data = res.json()
    return data, res


def nb_request_paginated(method: str, url: str, **kwargs):
    results = []
    data, = nb_request(method, url, **kwargs)
    results = get(data, 'results')
    next_page_url = get(data, 'next')
    while next_page_url is str:
        data, = nb_request(method, next_page_url, **kwargs)
        results += get(data, 'results')

    return results

# api methods


def ensure_prefix(path: str, suffix: str) -> str:
    return ('/' if not path.startswith('/') else '') + path


def nb_endpoint(path: str) -> str:
    return baseurl + ensure_prefix(path, '/')


def get_events(date_start=None, date_end=None):
    filters = {}
    if date_start is not None:
        filters['starting'] = nb_formatted_date(date_start)
    if date_end is not None:
        filters['until'] = nb_formatted_date(date_end)
    events = nb_request_paginated('get', nb_endpoint(
        f'/sites/{nation_slug}/pages/events'), params=filters)
    return events


def get_event_by_id(id: str):
    event = nb_get('get', nb_endpoint(
        f'/sites/{nation_slug}/pages/events/{id}')).json()
    return event

# def get_event_attendees_by_id(id: str):
#     attendees = nb_get('get', f'sites/{nation_slug}/pages/events/{id}/rsvps')
#     return attendees


# def create_rsvp_by_event_id(event_id, person):
    # rsvp = nb_request(f'/ sites/{nation_slug}/pages/events/{event_id}/rsvps')
    # TODO: update custom_fields['rsvp_count'] = Person.thisperson(person).count_rsvps()


def get_person(id):
    data, res = nb_request('get', nb_endpoint(f'/people/{id}'))
    person = get(data, 'person')
    return person

def create_or_get_person(
    email=None,
    first_name=None,
    last_name=None,
    phone=None,
    # photo_url=None,
    postcode=None,
    tags=[]
):
    if not email:
        raise Exception('Nationbuilder needs a minimum of an email')

    if postcode:
        geo = postcode_geo(postcode)

    # person schema: https://nationbuilder.com/people_api
    person = {
        "email": email,
        "first_name": first_name,
        "last_name": last_name,
        # "profile_image_url_ssl": photo_url,
        "phone": phone,
        # Using primary addresses allows NationBuilder to 'autodistrict' users to their relevant CLP, etc.
        # see https://nationbuilder.com/auto_districting
        "tags": tags + ["my_nearest_marginal_user"],
        "primary_address": {
            "country_code": "GB",
            "zip": postcode,
            "lat": geo.get('latitude'),
            "lng": geo.get('longitude')
        } if postcode is not None and geo is not None else None,
    }
    
    '''
    (https://nationbuilder.com/people_api)
    This endpoint attempts to match the input person resource to a person already in the nation.
    If a match is found, the matched person is updated and a 200 status code is returned.
    If a match is not found, a new person is created and a 201 status code is returned.
    Matches are found by including one of the following IDs in the request:
        civicrm_id
        county_file_id
        dw_id
        external_id
        email
        facebook_username
        ngp_id
        salesforce_id
        twitter_login
        van_id
    '''
    data, res = nb_request('put', nb_endpoint('/people/push'), json={
        "person": person
    })

    person = get(data, 'person')
    if person is None:
        return None

    return person


# def create_event(event, person):
#     '''
#     Post (moderated) events to NB
#     '''
#     event = nb_request('post', nb_endpoint(f'/sites/{nation_slug}/pages/events')).json()
#     create_rsvp_by_event_id(event, person)
#     return


# def get_neighbours(postcode):
#     '''
#     /people/search
#     '''
#     '''
#     /people/nearby
#     '''
