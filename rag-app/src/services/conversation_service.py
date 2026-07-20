from src.schemas.conversation_schema import ConversationCreate
from src.database.conversation_model import Conversation
from sqlalchemy.orm import Session
from src.database.message_model import Message

def create_conversation(
    db: Session,
    conversation_data: ConversationCreate,
):
    conversation = Conversation(
        document_id=conversation_data.document_id,
        title=conversation_data.title
    )
    
    db.add(conversation)
    db.commit()
    db.refresh(conversation)
    
    return conversation


def get_conversations_by_document(
    db: Session,
    document_id: int
):
    return (
        db.query(Conversation)
        .filter(Conversation.document_id == document_id)
        .order_by(Conversation.created_at.desc())
        .all()
    )
    

def get_messages_by_conversation(
    db: Session,
    conversation_id: int,
):
    return (
        db.query(Message)
        .filter(Message.conversation_id == conversation_id)
        .order_by(Message.created_at)
        .all()
    )
    
    
    
    