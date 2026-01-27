from collections import defaultdict

from rest_framework import serializers

from .models import Condition, Map


class MapSerializer(serializers.ModelSerializer):
    class Meta:
        model = Map
        fields = ["id", "name"]


class ConditionSerializer(serializers.ModelSerializer):
    map_name = MapSerializer()

    class Meta:
        model = Condition
        fields = ["id", "map_name", "condition", "start_time", "end_time"]


class GroupedConditionsSerializer(serializers.Serializer):
    def to_representation(self, instance):
        maps = defaultdict(list)
        for condition in instance:
            map_name = condition.map_name.name
            maps[map_name].append(ConditionSerializer(condition).data)

        new_maps = {"data": []}

        for map_name in maps:
            new_maps["data"].append(
                {"map_name": map_name, "conditions": maps[map_name]}
            )
            maps[map_name].sort(key=lambda x: x["start_time"])
        return new_maps
