from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from directions import get_route

app = FastAPI()
#Add api calling between front end and backend here
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/route")
async def route(
    origin: str = Query(...),
    destination: str = Query(...)
):
    points = await get_route(origin, destination)
    return {"polyline": points}
