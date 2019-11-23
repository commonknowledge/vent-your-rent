import os
import csv
from vent_your_rent.api.helpers.cache import cached_fn

def read_csv(filename: str):
    with open(os.path.join(os.path.dirname(__file__), f'./{filename}.csv')) as f:
        data = [
            {str(k): str(v) for k, v in row.items()}
            for row in csv.DictReader(f, skipinitialspace=True, delimiter=',', quotechar='"')
        ]
        return data

@cached_fn(lambda filename_arg: filename_arg, None)
def cached_read_csv(filename: str):
    return read_csv(filename)