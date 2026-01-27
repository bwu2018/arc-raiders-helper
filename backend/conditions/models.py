from django.db import models


class Map(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Condition(models.Model):
    map_name = models.ForeignKey(Map, on_delete=models.CASCADE)
    condition = models.CharField(max_length=100)
    start_time = models.CharField(max_length=100)
    end_time = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.map_name}: {self.condition} ({self.start_time, self.end_time})"
