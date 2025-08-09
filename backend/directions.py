import httpx

OSRM_URL = "https://router.project-osrm.org/route/v1/driving"

async def get_route(origin: str, destination: str):
    # origin = "lat,lng", destination = "lat,lng"
    o_lat, o_lng = origin.split(",")
    d_lat, d_lng = destination.split(",")

    url = f"{OSRM_URL}/{o_lng},{o_lat};{d_lng},{d_lat}"
    params = {
        "overview": "full",
        "geometries": "geojson"
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url, params=params)
        data = response.json()

    if not data.get("routes"):
        return []

    coords = data["routes"][0]["geometry"]["coordinates"]

    # Flip [lng, lat] → [lat, lng] for react-native-maps
    decoded = [[lat, lng] for lng, lat in coords]

    return decoded
