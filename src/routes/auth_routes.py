from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.schemas.auth_schema import RegisterRequest, LoginRequest
from src.database.dependencies import get_db
from src.database.models import User
from src.services.auth_service import hash_password, verify_password
from fastapi import HTTPException
from src.services.jwt_service import create_access_token
from src.utils.logger import logger

router = APIRouter()

@router.post("/register")
async def register(
    request: RegisterRequest,
    db: Session = Depends(get_db)
):
    existing_user = (
        db.query(User)
        .filter(User.email == request.email)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    hashed_password = hash_password(
        request.password
    )

    new_user = User(
        email=request.email,
        hashed_password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    logger.info(
        f"New user registration: {request.email}"
    )

    return {
        "message": "User registered successfully"
    }
    
@router.post("/login")
async def login(
    request: LoginRequest,
    db: Session = Depends(get_db)
):
    existing_user = (
        db.query(User)
        .filter(User.email == request.email)
        .first()
    )

    if existing_user:
        if verify_password(request.password, existing_user.hashed_password):
            
            token = create_access_token(
                {
                    "sub": existing_user.email,
                    "user_id": existing_user.id
                }
            )

            return {
                "access_token": token,
                "token_type": "bearer"
            }
        else:
            return {
                "message": "incorrect Password"
            }
            
    logger.info(
        f"Login attempt: {request.email}"
    )
            
    return {
        "message": "User does not exist"
    }