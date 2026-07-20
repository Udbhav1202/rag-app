import os

from src.services.text_extraction import extract_text
from src.services.chunk_service import chunks_creation
from src.rag.chroma_store import store_in_chroma
from src.services.document_service import save_document
from src.database.database import SessionLocal
from src.utils.logger import logger


def process_document(
    file_path,
    collection_name,
    original_filename,
    session_id,
    user_id,
):
    db = SessionLocal()

    try:
        extracted_text = extract_text(
            file_path
        )

        split_chunks = chunks_creation(
            extracted_text
        )

        store_in_chroma(
            split_chunks,
            collection_name,
            session_id,
            user_id
        )

        

        logger.info(
            f"Background processing completed for {original_filename}"
        )

    except Exception as error:

        logger.error(
            f"Background processing failed: {error}"
        )

    finally:

        if os.path.exists(file_path):
            os.remove(file_path)

        db.close()