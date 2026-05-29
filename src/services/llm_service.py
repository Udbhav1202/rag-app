from langchain_openai import ChatOpenAI
from src.config import CHAT_MODEL
def generate_answer(question, context):

    llm = ChatOpenAI(
        model=CHAT_MODEL
    )

    prompt = f"""
    Answer the question using the provided context.

    Context:
    {context}

    Question:
    {question}
    """

    response = llm.invoke(prompt)

    return response.content