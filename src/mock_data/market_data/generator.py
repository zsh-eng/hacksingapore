import json
import os

# Data to be written to the JSON file
data = {
    "oa_sa_all_investable": {
        "SINGAPORE T-BILLS": 0.035,
        "SINGAPORE GOVERNMENT BONDS": 0.02,
        "MANULIFE ASIA PACIFIC FUND": 0.03
    },
    "oa_35percent_investable": {
        "KEPPEL REIT": 0.072,
        "CREATIVE TECHNOLOGY LTD": 0.036,
        "CAPITALAND INVESTMENT LTD": 0.055
    },
    "oa_10percent_investable": {
        "SDPR GOLD TRUST": 0.011
    }
}
script_directory = os.path.dirname(os.path.abspath(__file__))
output_file = os.path.join(script_directory, f"investment_data.json")
# Write the data to a JSON file
with open(output_file, "w") as file:
    json.dump(data, file, indent=4)

print("investment_data.json file has been created successfully.")