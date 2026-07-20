from pydantic import BaseModel


class ChatRequest(BaseModel):
    document_id: int
    question: str


class ChatMessageResponse(BaseModel):
    role: str
    content: str

    class Config:
        from_attributes = True