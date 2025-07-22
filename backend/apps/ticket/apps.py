from django.apps import AppConfig


class TicketConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.ticket'

    def ready(self):
        import apps.ticket.signals  # Adjust path as needed
