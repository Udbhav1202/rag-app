from fastapi import APIRouter, UploadFile, File
import shutil
from src.services.session_id_creation import create_session_id
from src.services.text_extraction import extract_text
from src.services.chunk_service import chunks_creation 
from src.rag.chroma_store import store_in_chroma
from src.config.config import UPLOAD_DIR

router = APIRouter()


@router.get("/")
def read_root():
    return {"message": "RAG API is running!"}


@router.post("/upload")
def upload_pdf(file: UploadFile = File(...)):
    
    session_id = create_session_id()

    with open(f"{UPLOAD_DIR}/{file.filename}", "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    extracted_text = extract_text(
        f"{UPLOAD_DIR}/{file.filename}"
    )

    split_chunks = chunks_creation(extracted_text)
    
    filename = file.filename.replace(".", "_").replace(" ", "_").strip()
    
    store_in_chroma(split_chunks, filename, session_id)

    return {
        "session_id": session_id,
        "message": "Document processed successfully",
        "chunks_stored": len(split_chunks)
    }
    
