from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse

from src.schemas.chat_schema import ChatRequest
from src.rag.retrieval import search_chroma
from src.services.auth_dependency import get_current_user
from src.services.streaming_answer import stream_answer
from src.services.chat_history_db import save_message


router = APIRouter()

@router.post("/chat/stream")
async def chat_stream(
    request: ChatRequest,
    current_user=Depends(get_current_user)
):
    docs = search_chroma(
        request.question,
        request.session_id,
        current_user.id
    )
    
    if not docs:

        def empty_response():
            yield "I could not find that information in the document."

        return StreamingResponse(
            empty_response(),
            media_type="text/plain"
        )
        
    context = "\n".join(
        doc.page_content
        for doc in docs
    )
    
    save_message(
        request.session_id,
        "user",
        request.question
    )
    
    prompt = f"""
    Answer using the context only.

    Context:
    {context}

    Question:
    {request.question}
    """
    
    def generate():

        complete_answer = ""

        for chunk in stream_answer(prompt):

            complete_answer += chunk

            yield chunk

        save_message(
            request.session_id,
            "assistant",
            complete_answer
        )
        
    return StreamingResponse(
        generate(),
        media_type="text/plain"
    )
    


