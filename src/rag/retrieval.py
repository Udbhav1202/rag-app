from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma
from src.config.config import EMBEDDING_MODEL

def search_chroma(query, session_id, user_id):
    
    embeddings = OpenAIEmbeddings(
        model=EMBEDDING_MODEL
    )

    vector_store = Chroma(
        persist_directory="chroma_db",
        embedding_function=embeddings,
        collection_name="documents"
    )

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

    return results