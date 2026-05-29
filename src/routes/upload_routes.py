from fastapi import APIRouter, UploadFile, File
import shutil
from src.services.pdf_service import extract_text
from src.services.chunk_service import split_text
from src.rag.chroma_store import store_in_chroma
from src.config import UPLOAD_DIR

router = APIRouter()


@router.get("/")
def read_root():
    return {"message": "RAG API is running!"}


@router.post("/upload")
def upload_pdf(file: UploadFile = File(...)):

    with open(f"{UPLOAD_DIR}/{file.filename}", "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    extracted_text = extract_text(
        f"{UPLOAD_DIR}/{file.filename}"
    )

    split_chunks = split_text(extracted_text)

    store_in_chroma(split_chunks)

    return {
        "message": "Document processed successfully",
        "chunks_stored": len(split_chunks)
    }