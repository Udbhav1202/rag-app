from fastapi import (
    APIRouter,
    Depends,
)

from src.services.auth_dependency import get_current_user

from src.services.conversation_service import (
    create_conversation,
    get_conversations_by_document,
    get_messages_by_conversation
)
from src.schemas.conversation_schema import ConversationCreate

from sqlalchemy.orm import Session
from src.database.dependencies import get_db
from src.services.conversation_service import create_conversation

router = APIRouter()

@router.post("/conversations")
def create_conversation_endpoint(
    db: Session,
    conversation: ConversationCreate
):
    conversation = create_conversation(db, conversation)
    
    return conversation

@router.get("/documents/{document_id}/conversations")
def get_conversations_by_document_endpoint(
    document_id: int,
    db: Session = Depends(get_db),
    conversation: ConversationCreate = Depends(get_current_user)
):
    conversations = get_conversations_by_document(db, document_id)
    
    return [
        {
            "conversation_id": conversation.id,
            "document_id": conversation.document_id,
            "title": conversation.title,
            "created_at": conversation.created_at
        }
        for conversation in conversations
    ]


@router.get("/conversations/{conversation_id}/messages")
def get_messages_by_conversation_endpoint(
    conversation_id: int,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    messages = get_messages_by_conversation(db, conversation_id)
    
    return [
        {
            "message_id": message.id,
            "conversation_id": message.conversation_id,
            "content": message.content,
            "created_at": message.created_at
        }
        for message in messages
    ]