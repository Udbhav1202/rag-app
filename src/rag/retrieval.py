from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma
from src.config.config import EMBEDDING_MODEL
import time
from src.utils.logger import logger
from src.config.config import CHROMA_DB_PATH

def search_chroma(query, session_id, user_id):
    
    embeddings = OpenAIEmbeddings(
        model=EMBEDDING_MODEL
    )

    vector_store = Chroma(
        persist_directory=CHROMA_DB_PATH,
        embedding_function=embeddings,
        collection_name="documents"
    )
    
    start = time.time()

    results = vector_store.similarity_search(
        query,
        k=5,
        filter={
            "$and": [
                {"session_id": session_id},
                {"user_id": user_id}
            ]
        }
    )
    
    end = time.time()
    
    logger.info(
        f"Results Found: {len(results)}"
    )
    
    logger.info(
        f"Retrieval Time: {end-start:.2f}s"
    )

    return results