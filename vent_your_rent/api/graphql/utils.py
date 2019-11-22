
from vent_your_rent.api.helpers.utils import is_sequence, get


def resolve_attr(attr, cb=lambda d: d):
    def resolver(self, info):
        if is_sequence(attr):
            val = None
            for el in attr:
                val = get(self, el)
                if val is not None:
                    return cb(val)
        else:
            return cb(get(self, attr))
    return resolver

from graphene import Field, List
from graphene_django.filter.utils import (
    get_filtering_args_from_filterset,
    get_filterset_class
)
from functools import partial

class DjangoFilterField(Field):
    '''
    Custom field to use django-filter with graphene object types (without relay).
    from https://github.com/graphql-python/graphene-django/issues/206#issuecomment-349545645
    '''

    def __init__(self, _type, fields=None, extra_filter_meta=None,
                 filterset_class=None, *args, **kwargs):
        _fields = _type._meta.filter_fields
        _model = _type._meta.model
        self.of_type = _type
        self.fields = fields or _fields
        meta = dict(model=_model, fields=self.fields)
        if extra_filter_meta:
            meta.update(extra_filter_meta)
        self.filterset_class = get_filterset_class(filterset_class, **meta)
        self.filtering_args = get_filtering_args_from_filterset(
            self.filterset_class, _type)
        kwargs.setdefault('args', {})
        kwargs['args'].update(self.filtering_args)
        super().__init__(List(_type), *args, **kwargs)

    @staticmethod
    def list_resolver(manager, filterset_class, filtering_args, root, info, *args, **kwargs):
        filter_kwargs = {k: v for k,
                         v in kwargs.items() if k in filtering_args}
        qs = manager.get_queryset()
        qs = filterset_class(data=filter_kwargs, queryset=qs).qs
        return qs

    def get_resolver(self, parent_resolver):
        return partial(self.list_resolver, self.of_type._meta.model._default_manager,
                       self.filterset_class, self.filtering_args)

def create_graphql_instance(GraphqlType, **requested):
    '''
    Will safely load fields into a GraphQL type
    and return an instance.
    Gets around the errors thrown in https://github.com/graphql-python/graphene/blob/4720f7743e3efc97cc493b4ffbaf847114982519/graphene/types/objecttype.py#L99-L105
    when Graphene sees un-expected fields.
    '''
    safe_fields = {}
    for field in GraphqlType._meta.fields.keys():
        safe_fields.update({field: requested.get(field)})
    return GraphqlType(**safe_fields)