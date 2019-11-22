from django.contrib import admin
from vent_your_rent.api.models import Vent
from rangefilter.filter import DateRangeFilter

# Utils

from django.contrib import admin
from django.db.models import Q
import os
from django.template.loader import get_template

def FilterFactory(param: str, q):
    class SomeFilter(InputFilter):
        parameter_name = param
        title = param
        def queryset(self, request, queryset):
            term = self.value()
            if term is None:
                return  
            for bit in term.split():
                return queryset.filter(q(bit))
    return SomeFilter

class InputFilter(admin.SimpleListFilter):
    template = 'input_filter.html'

    def lookups(self, request, model_admin):
        # Dummy, required to show the filter.
        return ((),)

    def choices(self, changelist):
        # Grab only the "all" option.
        all_choice = next(super().choices(changelist))
        all_choice['query_parts'] = (
            (k, v)
            for k, v in changelist.get_filters_params().items()
            if k != self.parameter_name
        )
        yield all_choice

# Register your models here.

@admin.register(Vent)
class VentAdmin(admin.ModelAdmin):
    # List UI config

    list_display = ('date_created', 'postcode', 'is_published')

    list_filter = (
        'is_published',
        FilterFactory('caption', lambda bit: Q(caption__icontains=bit)),
        FilterFactory('postcode', lambda bit: Q(postcode__icontains=bit)),
        ('date_created', DateRangeFilter),
    )

    # Vent create/edit form

    def get_form(self, request, obj=None, **kwargs):
        form = super(VentAdmin, self).get_form(request, obj, **kwargs)
        form.base_fields['is_published'].initial = True
        return form