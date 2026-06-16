from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma
from src.config.config import EMBEDDING_MODEL
from src.config.config import CHROMA_DB_PATH

def store_in_chroma(chunks, filename, session_id, user_id, document_id):
    
    print(f"Storing {len(chunks)} chunks in Chroma for file: {filename}")
    
    embeddings = OpenAIEmbeddings(
        model=EMBEDDING_MODEL
    )
    
    metadata_list = [
        {
            "document_id": document_id,
            "session_id": session_id,
            "user_id": user_id,
            "source": filename
        }
        for _ in chunks
    ]
    
    vector_store = Chroma.from_texts(
        texts=chunks,
        embedding=embeddings,
        persist_directory=CHROMA_DB_PATH,
        collection_name="documents",
        metadatas=metadata_list
    )
    
    
    return vector_store