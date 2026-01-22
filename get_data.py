"""
Reformat API output. Output json with each map having [condition, start, end].
"""

import pathlib
from collections import defaultdict

import requests
from pydantic import BaseModel


# Read in
class Times(BaseModel):
    start: str
    end: str


class Condition(BaseModel):
    game: str
    name: str
    map: str
    icon: str
    description: str
    days: list
    times: list[Times]


class Data(BaseModel):
    data: list[Condition]


# Write out
class ConditionTimes(BaseModel):
    name: str
    start: str
    end: str


class Maps(BaseModel):
    map_name: str
    conditions: list[ConditionTimes]


class MapList(BaseModel):
    data: list[Maps]


def main():
    url = "https://metaforge.app/api/arc-raiders/event-timers"
    response = requests.get(url)
    response = response.json()
    m = Data(**response)

    maps = defaultdict(list)
    for condition in m.data:
        for time in condition.times:
            maps[condition.map].append(
                {"name": condition.name, "start": time.start, "end": time.end}
            )

    new_maps = {"data": []}

    for map_name in maps:
        maps[map_name].sort(key=lambda x: x["start"])
        new_maps["data"].append({"map_name": map_name, "conditions": maps[map_name]})

    new_m = MapList(**new_maps)
    json_string = new_m.model_dump_json(indent=2)
    file_path = pathlib.Path("Map_condition_timestamps.json")
    file_path.write_text(json_string, encoding="utf-8")


if __name__ == "__main__":
    main()
