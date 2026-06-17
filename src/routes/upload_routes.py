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
from src.config.config import UPLOAD_DIR
from src.services.auth_dependency import get_current_user
from src.utils.logger import logger
from fastapi import BackgroundTasks
from src.services.document_processor import (
    process_document
)


router = APIRouter()

# Supported file types
ALLOWED_EXTENSIONS = (
    ".pdf",
    ".docx",
    ".txt"
)


@router.post("/upload")
async def upload_document(
    background_tasks: BackgroundTasks,
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

    # Create a clean filename for collection metadata
    
    filename = (
        safe_filename
        .replace(".", "_")
        .replace(" ", "_")
        .strip()
    )
    
    background_tasks.add_task(
        process_document,
        file_path,
        filename,
        session_id,
        current_user.id,
        document_id
    )
    
    logger.info(
        f"User {current_user.id} uploading {file.filename}"
    )

    return {
        "session_id": session_id,
        "document_id": document_id,
        "message": "Document processing started"
    }