from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class UsersConfig(AppConfig):
    name = "vent_your_rent.users"
    verbose_name = _("Users")

    def ready(self):
        try:
            import vent_your_rent.users.signals  # noqa F401
        except ImportError:
            pass
