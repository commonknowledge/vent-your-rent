from promise.dataloader import Promise, DataLoader
from ..engine.geo import postcode_geo, bulk_postcode_geo, bulk_coordinate_geo
from .geo import GeocodeResult
from .utils import create_graphql_instance
from vent_your_rent.api.helpers.cache import cached_fn
from vent_your_rent.api.graphql.django import Vent
from dateutil import parser
from datetime import datetime

def GeoFromPostcodesLoaderFactory():
    '''
    Get geographic information for this postcode.

    GeoLoaderFactory({...})
        .load("LE115AG")
    GeoLoaderFactory({...})
        .load_many(["LE115AG", "WDD351"])
    '''

    def initialise_graphql_type(row):
        if row is None:
            return row
        return create_graphql_instance(
            GeocodeResult,
            **row
        )

    def batch_load_fields(postcodes):
        postcodes = [p.replace(" ", "") for p in postcodes]
        if len(postcodes) == 1:
            geo = postcode_geo(postcodes[0])
            return Promise.resolve([geo])

        geos = bulk_postcode_geo(postcodes)

        if geos is None or len(geos) == 0:
            return Promise.resolve([None for key in postcodes])

        key_map = [
            next((
                initialise_graphql_type(geo.get('result')) if geo.get('result') else None
                for geo in geos
                if geo['query'].replace(" ", "") == postcode
            ), None)
            for postcode in postcodes
        ]

        return Promise.resolve(key_map)

    return DataLoader(batch_load_fields)

def GeoFromCoordsLoaderFactory():
    '''
    Get geographic information for this coordinate.
    GeoLoaderFactory({...})
        .load({ latitude: y, longitude: x})
    GeoLoaderFactory({...})
        .load_many([{ latitude: y, longitude: y}, { latitude: y, longitude: x}])
    '''

    def get_cache_key(key):
        try:
            return f"{key.get('latitude')}::{key.get('longitude')}"
        except:
            return key

    def initialise_graphql_type(row):
        if row is None:
            return row
        return create_graphql_instance(
            GeocodeResult,
            **row
        )

    def batch_load_fields(coordinates):
        geos = bulk_coordinate_geo(coordinates)

        if geos is None or len(geos) == 0:
            return Promise.resolve([None for key in coordinates])

        key_map = [
            next((
                initialise_graphql_type(geo.get('result')) if geo.get('result') else None
                for geo in geos
                if geo['query'].get('latitude') == coord.get('latitude')
                and geo['query'].get('longitude') == coord.get('longitude')
            ), None)
            for coord in coordinates
        ]

        return Promise.resolve(key_map)

    return DataLoader(batch_load_fields, get_cache_key=get_cache_key)