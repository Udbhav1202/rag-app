from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma
from src.config import EMBEDDING_MODEL

def search_chroma(query):

    embeddings = OpenAIEmbeddings(
        model=EMBEDDING_MODEL
    )

    vector_store = Chroma(
        persist_directory="chroma_db",
        embedding_function=embeddings
    )

    results = vector_store.similarity_search(
        query,
        k=3
    )

    return results