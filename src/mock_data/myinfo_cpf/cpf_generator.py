import json
import requests
import os

id_list = [
    "S9812381D", "S9812382B", "S9812385G", "S9812387C",
    "S9912363Z", "S9912366D", "S9912369I", "S9912370B",
    "S9912372I", "S9912374E", "S6005053H", "S6005055D",
    "S9812379B", "F1612347K", "G1612348Q", "G1612349N",
    "G1612350T", "G1612352N", "G1612353L"
]

# id_list = [
#     "S9812381D"
# ]
base_url = "https://sandbox.api.myinfo.gov.sg/com/v4/person-sample/"
script_directory = os.path.dirname(os.path.abspath(__file__))
for id_ in id_list:
    url = f"{base_url}{id_}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        output_file = os.path.join(script_directory, f"{id_}.json")
        with open(output_file, "w") as file:
            json.dump(data, file, indent=4)
    else:
        print(f"Failed to retrieve data for ID: {id_} with status code {response.status_code}")