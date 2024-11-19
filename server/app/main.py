from fastapi import FastAPI, HTTPException, Query
from app.utils import search_for_email
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


@app.get("/links")
async def read_links(param: int = Query(1, ge=1, description="The page parameter to filter links.")):
    try:
        links = search_for_email(param)
        return {"links": links}
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error retrieving links: {str(e)}")
