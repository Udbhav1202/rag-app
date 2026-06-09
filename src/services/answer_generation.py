from langchain_openai import ChatOpenAI
from src.config.config import CHAT_MODEL
from src.services.chat_history_redis import get_chat_history

def generate_answer(question, context, session_id):

    llm = ChatOpenAI(
        model=CHAT_MODEL,
        temperature=0.2,
    )

    history = get_chat_history(session_id)
    print("Chat History:", history)

    prompt = f"""
    Answer the question using the provided context and chat history.

    If the answer is not present in the context, say:
    "I could not find that information in the document."

    Chat History:
    {history}

    Context:
    {context}

    Question:
    {question}
    """

    response = llm.invoke(prompt)

    return response.content