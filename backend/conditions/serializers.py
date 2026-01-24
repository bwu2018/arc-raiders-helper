from rest_framework import serializers

from .models import Condition


class ConditionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Condition
        fields = ["id", "map_name", "condition", "start_time", "end_time"]
