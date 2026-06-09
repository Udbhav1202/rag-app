from fastapi import APIRouter
from src.schemas.chat_schema import ChatRequest
from src.rag.retrieval import search_chroma
from src.services.answer_generation import generate_answer
from src.services.chat_history_redis import save_message

router = APIRouter()


@router.post("/chat")
def chat(request: ChatRequest):

    docs = search_chroma(
        request.question,
        request.session_id
    )
    
    save_message(
        request.session_id,
        "user",
        request.question
    )


    context = "\n".join(
        [doc.page_content for doc in docs]
    )

    answer = generate_answer(
        request.question,
        context,
        request.session_id
    )
    
    save_message(
        request.session_id,
        "assistant",
        answer
    )

    
    return {
        "question": request.question,
        "answer": answer
    }