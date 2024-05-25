import json
import random
from datetime import datetime, timedelta
import os

# List of IDs
id_list = ['F1612347K', 'G1612353L', 'S6005053H', 'S6005055D', 'S9812379B', 'S9812381D', 'S9812382B', 'S9812385G']
#id_list = ['F1612347K']
# Transaction types
transaction_types = ['Transport', 'Banking', 'Food', 'Retail', 'Services', 'Entertainment']
# Transaction types and their respective places
places = {
    'Transport': ['SMRT transit', 'Scoot', 'Singapore Airlines', 'Air Asia'],
    'Banking': ['DBS'],
    'Food': ['Mcdonalds', 'Kopitiam', 'Hawker Centre', 'Bangkok Street Mookata', 'KFC', 'Koi'],
    'Retail': ['NTUC Fairprice', 'Cold Storage', 'Love Bonito', 'Kiddy Palace', 'Popular Bookstore', 'Angelhack'],
    'Services': ["Wui Hong's Upz Carwash Service", "Bob's Bicycle Repair", 'Tan Tailor and Stitching', 'Sim Lim PC Repair'],
    'Entertainment': ['Cathay Cineplexes', 'Zhi Sheng Bowling Joint', 'Hong Prawning', 'Teo Heng KTV']
}

# Function to generate a random date and time within the specified range
def generate_random_datetime(start_date, end_date):
    delta = end_date - start_date
    random_days = random.randrange(delta.days)
    random_seconds = random.randrange(86400)  # 86400 seconds in a day
    return start_date + timedelta(days=random_days, seconds=random_seconds)

# Date range
start_date = datetime(2024, 4, 1)
end_date = datetime(2024, 6, 1)  # End of May 2024

# Function to generate a random transaction
def generate_transaction():
    transaction_type = random.choice(list(places.keys()))
    amount = round(random.uniform(0.01, 2000.00), 2)
    place = random.choice(places[transaction_type])
    if transaction_type != 'Banking':
        amount = -amount
    else:
        if random.choice([True, False]):
            amount = -amount
    transaction = {
        "date_time": generate_random_datetime(start_date, end_date).strftime("%Y-%m-%d %H:%M:%S"),
        "transaction_type": transaction_type,
        "amount": amount,
        "place": place
    }
    return transaction

# Get the directory of the current script
script_directory = os.path.dirname(os.path.abspath(__file__))

# Generate transactions for each ID and write to JSON files in the same directory as the script
for id_ in id_list:
    transactions = [generate_transaction() for _ in range(1000)]
    output_file = os.path.join(script_directory, f"{id_}_transactions.json")
    with open(output_file, "w") as file:
        json.dump(transactions, file, indent=4)

print("Transaction files have been created successfully in the script's directory.")