from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class ApiConfig(AppConfig):
    name = "vent_your_rent.api"
    verbose_name = _("API")
