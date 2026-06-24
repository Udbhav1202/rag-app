from fastapi import APIRouter, Depends
from src.schemas.chat_schema import ChatRequest
from src.rag.retrieval import search_chroma
from src.services.answer_generation import generate_answer
from src.services.chat_history_db import save_message
from src.services.auth_dependency import (
    get_current_user
)
router = APIRouter()

from src.utils.logger import logger


@router.post("/chat")
async def chat(
    request: ChatRequest,
    current_user = Depends(get_current_user)
):

    logger.info("CHAT ROUTE HIT")
    
    docs = search_chroma(
        request.question,
        request.session_id,
        current_user.id
    )
    
    save_message(
        request.session_id,
        current_user.id,
        "user",
        request.question
    )


    context = "\n".join(
        [doc.page_content for doc in docs]
    )
    
    if not docs:
        return {
            "question": request.question,
            "answer": "I could not find that information in the document.",
            "sources": []
        }

    answer = generate_answer(
        request.question,
        context,
        request.session_id
    )
    
    save_message(
        request.session_id,
        current_user.id,
        "assistant",
        answer
    )
    
    sources = []
    
    for doc in docs:
        sources.append(
            doc.metadata["source"]
        )
    
    sources = list(
        set(sources)
    )
    
    logger.info(
        f"Question received: {request.question}"
    )

    return {
        "question": request.question,
        "answer": answer,
        "sources": sources
    }