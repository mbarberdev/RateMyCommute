import os
import requests

TOMTOM_API_KEY = os.getenv("TOMTOM_API_KEY")


def fetch_route_data(origin, destination):
    print("TOMTOM_API_KEY:", TOMTOM_API_KEY)

    url = f"https://api.tomtom.com/routing/1/calculateRoute/{origin}:{destination}/json?key={TOMTOM_API_KEY}&traffic=true"
    print("URL:", url)

    response = requests.get(url).json()
    print("RAW RESPONSE:", response)

    summary = response["routes"][0]["summary"]

    return {
        "travel_time": summary["travelTimeInSeconds"],
        "delay": summary.get("trafficDelayInSeconds", 0),
        "incident_count": len(response["routes"][0].get("sections", [])),
    }
