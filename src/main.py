from fastapi import FastAPI

from src.routes.upload_routes import router as upload_router
from src.routes.chat_routes import router as chat_router

from src.database.database import engine
from src.database.user_model import User
from src.routes.auth_routes import router as auth_router
from src.routes.delete_route import router as delete_router
from src.routes.stream_chat_routes import router as stream_chat_router

User.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth_router)
app.include_router(upload_router)
app.include_router(chat_router)
app.include_router(delete_router)
app.include_router(stream_chat_router)