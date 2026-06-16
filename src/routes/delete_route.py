
from src.services.auth_dependency import (
    get_current_user
)

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    File
)

from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma
from src.config.config import EMBEDDING_MODEL
from src.config.config import CHROMA_DB_PATH
from src.utils.logger import logger


router = APIRouter()

@router.delete("/delete/{document_id}")
def delete_document(
    document_id: str,
    current_user=Depends(get_current_user)
):
    embeddings = OpenAIEmbeddings(
        model=EMBEDDING_MODEL
    )

    vector_store = Chroma(
        persist_directory=CHROMA_DB_PATH,
        embedding_function=embeddings,
        collection_name="documents"
    )
    
    vector_store._collection.delete(
        where={
            "$and": [
                {"document_id": document_id},
                {"user_id": current_user.id}
            ]
        }
    )
    
    logger.info(
        f"Deleting document {document_id}"
    )
    
    return {
        "message": "Document deleted successfully",
        "document_id": document_id
    }