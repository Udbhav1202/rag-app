import redis
from fastapi import APIRouter
router = APIRouter()

from src.config.config import (
    REDIS_HOST,
    REDIS_PORT,
    REDIS_PASSWORD
)

redis_client = redis.Redis(
    host=REDIS_HOST,
    port=REDIS_PORT,
    password=REDIS_PASSWORD,
    decode_responses=True
)

@router.get("/redis-test")
def redis_test():

    redis_client.set(
        "test_key",
        "Redis Connected"
    )

    value = redis_client.get(
        "test_key"
    )

    return {
        "message": value
    }