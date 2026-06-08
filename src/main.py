from fastapi import FastAPI

from src.routes.upload_routes import router as upload_router
from src.routes.chat_routes import router as chat_router
from src.memory.redis_memory import router as redis_router

app = FastAPI()


app.include_router(upload_router)
app.include_router(chat_router)
app.include_router(redis_router)