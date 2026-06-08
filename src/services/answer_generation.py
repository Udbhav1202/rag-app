from langchain_openai import ChatOpenAI
from src.config.config import CHAT_MODEL
def generate_answer(question, context):

    llm = ChatOpenAI(
        model=CHAT_MODEL,
        temperature=0.2,
    )

    prompt = f"""
    Answer the question using the provided context.
    dont answer if the context does not contain the answer. be concise and to the point.

    Context:
    {context}

    Question:
    {question}
    """

    response = llm.invoke(prompt)

    return response.content