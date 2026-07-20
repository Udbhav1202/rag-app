from sqlalchemy.orm import Session
from src.database.chat_model import ChatMessage
from src.services.cache import r
import json


def save_message(
    db: Session,
    document_id: int,
    user_id: int,
    role: str,
    content: str,
):
    message = ChatMessage(
        document_id=document_id,
        user_id=user_id,
        role=role,
        content=content,
    )

    db.add(message)
    db.commit()

    # Clear Redis cache
    r.delete(f"chat_history:{document_id}")


def get_chat_history(
    db: Session,
    document_id: int,
):
    cached_data = r.get(f"chat_history:{document_id}")

    if cached_data:
        print("CACHE HIT")
        return json.loads(cached_data)

    print("CACHE MISS")

    messages = (
        db.query(ChatMessage)
        .filter(ChatMessage.document_id == document_id)
        .order_by(ChatMessage.created_at.asc())
        .all()
    )

    history = [
        f"{msg.role}:{msg.content}"
        for msg in messages
    ]

    r.set(
        f"chat_history:{document_id}",
        json.dumps(history)
    )

    print("CACHE STORED")

    return history


def get_messages_by_document(
    db: Session,
    document_id: int,
    user_id: int,
):
    messages = (
        db.query(ChatMessage)
        .filter(ChatMessage.document_id == document_id)
        .filter(ChatMessage.user_id == user_id)
        .order_by(ChatMessage.created_at.asc())
        .all()
    )

    return messages