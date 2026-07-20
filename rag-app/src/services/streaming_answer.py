from langchain_openai import ChatOpenAI
from src.config.config import CHAT_MODEL

def stream_answer(prompt):

    llm = ChatOpenAI(
        model=CHAT_MODEL,
        temperature=0.2,
        streaming=True
    )

    for chunk in llm.stream(prompt):

        if chunk.content:
            yield chunk.content