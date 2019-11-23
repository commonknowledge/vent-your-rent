from vent_your_rent.api.graphql import loaders
from datetime import datetime  

class DataLoadersMiddleware:
    def resolve(self, next, root, info, **kwargs):
        if not hasattr(info.context, 'loaders'):
            setattr(info.context, 'loaders', {
                'geo_from_postcode': loaders.GeoFromPostcodesLoaderFactory(),
                'geo_from_coords': loaders.GeoFromCoordsLoaderFactory(),
            })
        return next(root, info, **kwargs)