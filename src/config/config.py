from dotenv import load_dotenv
import os

load_dotenv()


OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

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