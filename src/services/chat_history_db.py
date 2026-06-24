from sqlalchemy.orm import Session

from src.database.database import SessionLocal
from src.database.chat_model import ChatMessage
from src.services.cache import r
import json

def save_message(
    session_id,
    user_id,
    role,
    content
):
    db: Session = SessionLocal()

    message = ChatMessage(
        session_id=session_id,
        user_id=user_id,
        role=role,
        content=content
    )

    db.add(message)
    db.commit()
    
    r.delete(
        f"chat_history:{session_id}"
    )
    
    db.close()


def get_chat_history(session_id):

    cached_data = r.get(
        f"chat_history:{session_id}"
    )

    if cached_data:

        print("CACHE HIT")

        return json.loads(
            cached_data
        )

    print("CACHE MISS")

    db: Session = SessionLocal()

    messages = (
        db.query(ChatMessage)
        .filter(
            ChatMessage.session_id == session_id
        )
        .order_by(ChatMessage.id)
        .all()
    )

    db.close()

    history = [
        f"{msg.role}:{msg.content}"
        for msg in messages
    ]

    r.set(
        f"chat_history:{session_id}",
        json.dumps(history)
    )
    
    print("CACHE STORED")

    return history