from langchain_text_splitters import RecursiveCharacterTextSplitter

def split_text(text):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50
    )

    chunks = text_splitter.split_text(text)
    return chunks


# def generate_embedding(chunks):
#     embeddings = OpenAIEmbeddings(
#         model="text-embedding-3-small"
#     )

#     vector = embeddings.embed_documents(chunks)
#     return vector