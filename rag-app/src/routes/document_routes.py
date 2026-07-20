from fastapi import (
    APIRouter,
    Depends,
)

from src.services.auth_dependency import get_current_user
from src.services.document_service import (
    list_documents
)
from sqlalchemy.orm import Session
from src.database.dependencies import get_db
from src.schemas.document_schema import DocumentResponse


router = APIRouter()

@router.get(
    "/documents",
    response_model=list[DocumentResponse]
)
def get_documents(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return list_documents(
        db,
        current_user.id
    )