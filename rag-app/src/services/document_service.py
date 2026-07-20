from sqlalchemy.orm import Session

from src.database.document_model import Document

def save_document(
    db: Session,
    user_id: int,
    filename: str,
    session_id: str,
):
    document = Document(
        user_id=user_id,
        filename=filename,
        session_id=session_id,
    )

    db.add(document)
    db.commit()
    db.refresh(document)

    return document


def list_documents(
    db: Session,
    user_id: int,
):
    return (
        db.query(Document)
        .filter(Document.user_id == user_id)
        .order_by(Document.created_at.desc())
        .all()
    )
    
def get_document_by_id(
    db: Session,
    document_id: int,
    user_id: int
):
    document = (
        db.query(Document)
        .filter(Document.user_id == user_id)
        .filter(Document.id == document_id)
        .first()
        )
    
    return document