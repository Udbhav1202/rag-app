from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from src.database.dependencies import get_db
from src.database.user_model import User
from src.services.jwt_service import verify_access_token

security = HTTPBearer()

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    
    payload = verify_access_token(
        credentials.credentials
    )
    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )
    user_id = payload.get("user_id")
    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )
    if user is None:
        raise HTTPException(
            status_code=401,
            detail="User not found"
        )
    return user