from fastapi import FastAPI, Query, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from directions import get_route
from typing import List
import uuid
import os
import backend_llm
import aiofiles
import asyncio

app = FastAPI()
#Add api calling between front end and backend here
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload")
async def upload(
    images_bytes: List[UploadFile] = File(...),
    text_descr: str = Form("")
):
    images = []

    # images = []
    if len(images_bytes) == 0 and text_descr == "":
        return JSONResponse(content={"message": "no attached images and text description found!"}, status_code=400)
    if len(images_bytes) != 0:
        uuid_number = uuid.uuid4().hex
        os.makedirs(f"uploads/upload_{uuid_number}", exist_ok=True)
        ct = 0
        for image in images_bytes:
            f = image.file
            file_path = f"upload_{uuid_number}/{ct}_{image.filename}"

            contents = await image.read()
            
            async with aiofiles.open(f"uploads/{file_path}", "wb") as out_f:
                await out_f.write(contents)

            images.append({
                "file_location": f"uploads/{file_path}",
                "mime_type": image.content_type
            })

            ct += 1

    scores = await asyncio.to_thread(backend_llm.get_scores, images, text_descr)
    return JSONResponse(content=scores, status_code=200)


    
@app.get("/route")
async def route(
    origin: str = Query(...),
    destination: str = Query(...)
):
    points = await get_route(origin, destination)
    return {"polyline": points}
