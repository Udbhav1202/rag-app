from src.services.text_extraction import extract_text
from src.services.chunk_service import chunks_creation
from src.rag.chroma_store import store_in_chroma
from src.utils.logger import logger
import os

def process_document(
    file_path,
    filename,
    session_id,
    user_id,
    document_id
):
    try:

        extracted_text = extract_text(
            file_path
        )

        split_chunks = chunks_creation(
            extracted_text
        )

        store_in_chroma(
            split_chunks,
            filename,
            session_id,
            user_id,
            document_id
        )

        os.remove(file_path)

        logger.info(
            f"Background processing completed for {filename}"
        )

    except Exception as error:

        logger.error(
            f"Background processing failed: {error}"
        )