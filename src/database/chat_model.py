
from sqlalchemy import Column, Integer, String, Text
from src.database.database import Base

class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String)
    user_id = Column(Integer)

    role = Column(String)
    content = Column(Text)