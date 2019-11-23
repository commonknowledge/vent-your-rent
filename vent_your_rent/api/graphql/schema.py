import graphene
from . import geo, django, statistics

class Query(
    graphene.ObjectType,
    django.Queries,
    geo.Queries,
    statistics.Queries,
):
    # This class will inherit from multiple Queries
    # as we begin to add more apps to our project
    pass

class Mutation(
    graphene.ObjectType,
    django.Mutations
):
    # This class will inherit from multiple Queries
    # as we begin to add more apps to our project
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)
