import os
import requests

TOMTOM_API_KEY = os.getenv("TOMTOM_API_KEY")

def geocode_address(address):
    url = f"https://api.tomtom.com/search/2/geocode/{address}.json?key={TOMTOM_API_KEY}"
    response = requests.get(url).json()

    position = response["results"][0]["position"]
    lat = position["lat"]
    lon = position["lon"]

    return f"{lat},{lon}"
