from fastapi import APIRouter, Depends, HTTPException
from src.schemas.chat_schema import ChatRequest, ChatMessageResponse
from src.rag.retrieval import search_chroma
from sqlalchemy.orm import Session
from src.services.answer_generation import generate_answer
from src.services.chat_history_db import save_message
from src.services.auth_dependency import (
    get_current_user
)

from src.services.document_service import get_document_by_id

from src.services.chat_history_db import get_messages_by_document

from src.database.dependencies import get_db
router = APIRouter()

from src.utils.logger import logger


@router.post("/chat")
async def chat(
    request: ChatRequest,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):

    logger.info("CHAT ROUTE HIT")
    
    document = get_document_by_id(
        db=db,
        document_id=request.document_id,
        user_id=current_user.id
    )
    
    if not document:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )
    
    docs = search_chroma(
        request.question,
        document.session_id,
        current_user.id
    )
    
    save_message(
        db,
        request.document_id,
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

    answer =  generate_answer(
        db=db,
        question=request.question,
        context=context,
        document_id=request.document_id,
    )
    
    save_message(
        db,
        request.document_id,
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
    

@router.get(
    "/chat/{document_id}/messages",
    response_model=list[ChatMessageResponse],
)
async def get_document_messages(
    document_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    document = get_document_by_id(
        db=db,
        document_id=document_id,
        user_id=current_user.id,
    )

    if not document:
        raise HTTPException(
            status_code=404,
            detail="Document not found.",
        )

    messages = get_messages_by_document(
        db=db,
        document_id=document_id,
        user_id=current_user.id,
    )

    return messages