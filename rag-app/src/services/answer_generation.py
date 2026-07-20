from langchain_openai import ChatOpenAI
from src.config.config import CHAT_MODEL
from src.services.chat_history_db import get_chat_history
from langchain_community.callbacks import get_openai_callback
from src.utils.logger import logger
from src.services.cache import r
from sqlalchemy.orm import Session
import json

def generate_answer(
    db: Session,
    question,
    context,
    document_id,
):

    

    history = get_chat_history(
        db=db,
        document_id=document_id,
    )
    
    logger.info(
        f"Chat History Length: {len(history)}"
    )

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
    
    cached_answer = r.get(
        f"answer:{document_id}:{question}"
    )

    if cached_answer:
    
        logger.info("ANSWER CACHE HIT")
    
        return json.loads(
            cached_answer
        )
        
    llm = ChatOpenAI(
        model=CHAT_MODEL,
        temperature=0.2,
    )

    logger.info("ANSWER CACHE MISS")

    try:
        with get_openai_callback() as cb:
            response = llm.invoke(prompt)
        
            logger.info(
                f"Tokens Used: {cb.total_tokens}"
            )

            logger.info(
                f"Prompt Tokens: {cb.prompt_tokens}"
            )

            logger.info(
                f"Completion Tokens: {cb.completion_tokens}"
            )
            
            logger.info(
                f"Total Cost: ${cb.total_cost:.6f}"
            )
    except Exception as error:
        logger.error(
            f"Failed to generate answer: {error}"
        )
        raise
    
    r.set(
        f"answer:{document_id}:{question}",
        json.dumps(response.content)
    )

    return response.content