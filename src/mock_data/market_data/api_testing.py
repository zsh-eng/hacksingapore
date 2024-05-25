import requests
import json
from datetime import datetime

# Your Alpha Vantage API key
API_KEY = '9275WDMH3EPSLUAP'

# Function to get the annual return for a commodity
def get_annual_return(symbol):
    url = f'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol={symbol}&apikey={API_KEY}'
    response = requests.get(url)
    data = response.json()

    # Extract the time series data
    time_series = data.get('Time Series (Daily)', {})

    if not time_series:
        print(f"No data found for {symbol}")
        return None

    # Get the dates and corresponding adjusted close prices
    sorted_dates = sorted(time_series.keys())
    first_date = sorted_dates[0]
    last_date = sorted_dates[-1]

    first_close = float(time_series[first_date]['5. adjusted close'])
    last_close = float(time_series[last_date]['5. adjusted close'])

    # Calculate the percentage return
    annual_return = ((last_close - first_close) / first_close) * 100
    return annual_return

# Symbols for the given commodities
commodities = {
    'Keppel Reit': 'K71U.SI',
    'Creative Technology Ltd.': 'C76.SI',
    'Capitaland Investment Ltd': '9CI.SI',
    'SPDR Gold Trust': 'GLD'
}

# Get the annual return for each commodity
annual_returns = {}
for name, symbol in commodities.items():
    annual_return = get_annual_return(symbol)
    if annual_return is not None:
        annual_returns[name] = annual_return

# Print the annual returns
print(json.dumps(annual_returns, indent=4))