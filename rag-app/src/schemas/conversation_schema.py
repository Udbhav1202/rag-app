from pydantic import BaseModel
from datetime import datetime


class ConversationCreate(BaseModel):
    document_id: int
    title: str


class ConversationResponse(BaseModel):
    id: int
    document_id: int
    title: str
    created_at: datetime

    class Config:
        from_attributes = True
        
class ConversationUpdate(BaseModel):
    title: str