import requests
from django.core.management.base import BaseCommand

from conditions.models import Condition, Map


class Command(BaseCommand):
    help = "Get data and fill database"

    def handle(self, *args, **kwargs):
        url = "https://metaforge.app/api/arc-raiders/events-schedule"
        response = requests.get(url)
        response = response.json()

        for data in response["data"]:
            map_name, _ = Map.objects.get_or_create(name=data["map"])

            Condition.objects.create(
                map_name=map_name,
                condition=data["name"],
                start_time=data["startTime"],
                end_time=data["endTime"],
            )
