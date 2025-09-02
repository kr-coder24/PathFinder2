import httpx
import os
from dotenv import load_dotenv
import polyline

load_dotenv() 

API_KEY = os.getenv("GOOGLE_API_KEY")
OSRM_URL = "https://router.project-osrm.org/route/v1/driving"
GOOGLE_URL = "https://routes.googleapis.com/directions/v2:computeRoutes"

async def get_route(origin: str, destination: str):
    o_lat, o_lng = origin.split(",")
    d_lat, d_lng = destination.split(",")
    #will use the trafic data and live time returned later.
    body = {
        "origin": {"location": {"latLng": {"latitude": float(o_lat), "longitude": float(o_lng)}}},
        "destination": {"location": {"latLng": {"latitude": float(d_lat), "longitude": float(d_lng)}}},
        "travelMode": "DRIVE"
    }

    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask": "routes.polyline.encodedPolyline"
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(GOOGLE_URL,headers=headers,json=body)
        data = response.json()

    encoded_polyline = data["routes"][0]["polyline"]["encodedPolyline"]

    # Decode Google’s encoded polyline to [lat, lng]
    return polyline.decode(encoded_polyline)
