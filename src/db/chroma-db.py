from pathlib import Path
import chromadb

BASE_DIR = Path(__file__).resolve().parent.parent.parent

CHROMA_DB_PATH = BASE_DIR / "chroma_db"

client = chromadb.PersistentClient(path=str(CHROMA_DB_PATH))

collection = client.get_collection("UDBHAV_SRIVASTAVA_CSE_RESUME_pdf")

print(collection.count())