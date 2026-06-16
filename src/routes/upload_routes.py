from fastapi import (
    APIRouter,
    UploadFile,
    Depends,
    HTTPException,
    File
)
import uuid
import shutil
import os

from src.services.session_id_creation import create_session_id
from src.services.text_extraction import extract_text
from src.services.chunk_service import chunks_creation
from src.rag.chroma_store import store_in_chroma
from src.config.config import UPLOAD_DIR
from src.services.auth_dependency import get_current_user
from src.utils.logger import logger


router = APIRouter()

# Supported file types
ALLOWED_EXTENSIONS = (
    ".pdf",
    ".docx",
    ".txt"
)


@router.post("/upload")
def upload_document(
    file: UploadFile = File(...),
    current_user=Depends(get_current_user)
):
    logger.info("UPLOAD ROUTE HIT")
    
    document_id = str(
        uuid.uuid4()
    )

    # Ensure uploaded file has an allowed extension
    if not any(
        file.filename.lower().endswith(ext)
        for ext in ALLOWED_EXTENSIONS
    ):
        raise HTTPException(
            status_code=400,
            detail="File type not allowed"
        )

    # Generate a unique session id
    # Used to group all chunks belonging to this upload
    session_id = create_session_id()

    # Prevent path traversal attacks such as:
    # ../../../config.py
    safe_filename = os.path.basename(
        file.filename
    )

    # Full path where file will be stored
    file_path = (
        f"{UPLOAD_DIR}/{safe_filename}"
    )

    # Save uploaded file to disk
    with open(
        file_path,
        "wb"
    ) as buffer:

        shutil.copyfileobj(
            file.file,
            buffer
        )

    # Extract text from the saved document
    try:
        extracted_text = extract_text(
            file_path
        )

    except Exception as error:
        raise HTTPException(
            status_code=400,
            detail=f"Failed to process file: {str(error)}"
        )

    # Reject documents with no readable text
    if not extracted_text.strip():
        raise HTTPException(
            status_code=400,
            detail="No text found in document"
        )

    # Split large text into smaller chunks
    # before generating embeddings
    split_chunks = chunks_creation(
        extracted_text
    )

    # Ensure chunking produced data
    if not split_chunks:
        raise HTTPException(
            status_code=400,
            detail="Unable to create chunks"
        )

    # Create a clean filename for collection metadata
    filename = (
        safe_filename
        .replace(".", "_")
        .replace(" ", "_")
        .strip()
    )

    # Store chunks and embeddings in ChromaDB
    store_in_chroma(
        split_chunks,
        filename,
        session_id,
        current_user.id,
        document_id
    )
    
    os.remove(file_path)
    
    logger.info(
        f"User {current_user.id} uploading {file.filename}"
    )

    return {
        "session_id": session_id,
        "document_id": document_id,
        "message": "Document uploaded",
        "chunks_stored": len(split_chunks)
    }