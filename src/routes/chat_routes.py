from fastapi import APIRouter
from src.schemas.chat_schema import ChatRequest
from src.rag.retrieval import search_chroma
from src.services.answer_generation import generate_answer

router = APIRouter()


@router.post("/chat")
def chat(request: ChatRequest):

    docs = search_chroma(
        request.question,
        request.session_id
    )

    context = "\n".join(
        [doc.page_content for doc in docs]
    )

    answer = generate_answer(
        request.question,
        context
    )

    return {
        "question": request.question,
        "answer": answer
    }