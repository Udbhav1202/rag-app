from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma
from src.config import EMBEDDING_MODEL
from src.config import CHROMA_DB_PATH

def store_in_chroma(chunks):
    embeddings = OpenAIEmbeddings(
        model=EMBEDDING_MODEL
    )
    
    vector_store = Chroma.from_texts(
        texts=chunks,
        embedding=embeddings,
        persist_directory=CHROMA_DB_PATH
    )
    
    return vector_store