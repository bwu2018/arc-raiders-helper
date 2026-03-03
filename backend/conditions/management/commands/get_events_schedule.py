import requests
from django.core.management.base import BaseCommand

from conditions.models import Condition, Map


class Command(BaseCommand):
    help = "Get data and fill database"

    def handle(self, *args, **kwargs):
        self.stdout.write("Starting get_events_schedule...")
        url = "https://metaforge.app/api/arc-raiders/events-schedule"
        self.stdout.write("Starting get_events_schedule...")
        response = requests.get(url)
        response = response.json()
        self.stdout.write(f"Fetched {len(response['data'])} records")

        for data in response["data"]:
            map_name, _ = Map.objects.get_or_create(name=data["map"])

            Condition.objects.get_or_create(
                map_name=map_name,
                condition=data["name"],
                start_time=data["startTime"],
                end_time=data["endTime"],
            )
        self.stdout.write(self.style.SUCCESS("Database populated successfully!"))
