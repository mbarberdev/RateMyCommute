import os
import requests

TOMTOM_API_KEY = os.getenv("TOMTOM_API_KEY")

def reverse_geocode(lat, lon):
    url = f"https://api.tomtom.com/search/2/reverseGeocode/{lat},{lon}.json?key={TOMTOM_API_KEY}"
    response = requests.get(url).json()

    address = response["addresses"][0]["address"]["freeformAddress"]
    return address
