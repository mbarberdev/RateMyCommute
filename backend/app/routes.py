from flask import Blueprint, request, jsonify
from .services.tomtom_service import fetch_route_data
from .services.rating_service import calculate_rating
from .services.geocode_service import geocode_address
from .services.reverse_geocode_service import reverse_geocode

api = Blueprint("api", __name__)

def is_coordinates(value):
    if not value or "," not in value:
        return False
    parts = value.split(",")
    if len(parts) != 2:
        return False
    return all(
        part.replace(".", "", 1).replace("-", "", 1).isdigit()
        for part in parts
    )

@api.route("/api/commute", methods=["POST"])
def commute():
    data = request.get_json()

    origin_input = data.get("origin")
    destination_input = data.get("destination")

    if not origin_input or not destination_input:
        return jsonify({"error": "Missing origin or destination"}), 400

    # origin
    if is_coordinates(origin_input):
        origin = origin_input
    else:
        try:
            origin = geocode_address(origin_input)
        except:
            return jsonify({"error": "Invalid origin address"}), 400

    # destination
    if is_coordinates(destination_input):
        destination = destination_input
    else:
        try:
            destination = geocode_address(destination_input)
        except:
            return jsonify({"error": "Invalid destination address"}), 400

    # route calculation
    try:
        route_info = fetch_route_data(origin, destination)
    except Exception as e:
        print("BACKEND ERROR:", e)
        return jsonify({"error": str(e)}), 500

    rating = calculate_rating(route_info)
    return jsonify({**route_info, "rating": rating})


#reverse geocoding
#(geocoding and reverse is needed to go to->from and from->to coordinates)
@api.route("/api/reverse", methods=["POST"])
def reverse_lookup():
    data = request.get_json()
    coords = data.get("coords")

    if not coords or "," not in coords:
        return jsonify({"error": "Invalid coordinates"}), 400

    lat, lon = coords.split(",")

    try:
        address = reverse_geocode(lat.strip(), lon.strip())
    except Exception as e:
        print("REVERSE GEOCODE ERROR:", e)
        return jsonify({"error": "Unable to find address"}), 500

    return jsonify({"address": address})
