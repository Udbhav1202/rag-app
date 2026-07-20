from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from src.database.database import Base


class Document(Base):
    __tablename__ = "documents"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        index=True
    )

    filename = Column(
        String,
        nullable=False
    )

    session_id = Column(
        String,
        nullable=False,
        unique=True
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    user = relationship(
        "User",
        back_populates="documents"
    )
    
    conversations = relationship(
        "Conversation",
        back_populates="document",
        cascade="all, delete-orphan",
    )
    
    messages = relationship(
        "ChatMessage",
        back_populates="document",
        cascade="all, delete-orphan",
    )