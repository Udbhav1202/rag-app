from dotenv import load_dotenv
import os

load_dotenv()


OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

REDIS_HOST = os.getenv("REDIS_HOST")
REDIS_PORT = os.getenv("REDIS_PORT")
REDIS_PASSWORD = os.getenv("REDIS_PASSWORD")

EMBEDDING_MODEL = os.getenv(
    "EMBEDDING_MODEL"
)

CHAT_MODEL = os.getenv(
    "CHAT_MODEL"
)

CHROMA_DB_PATH = os.getenv(
    "CHROMA_DB_PATH"
)

UPLOAD_DIR = os.getenv(
    "UPLOAD_DIR"
)

SECRET_KEY = os.getenv(
    "JWT_SECRET_KEY"
)

ALGORITHM = os.getenv(
    "ALGORITHM"
)

ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv(
    "ACCESS_TOKEN_EXPIRE_MINUTES"
))