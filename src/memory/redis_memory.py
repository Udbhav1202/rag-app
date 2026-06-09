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

## Todo
# - Create shared redis_client.py
# - Remove duplicate Redis connections
# - Import redis_client everywhere
# - Remove unused Redis router file (if truly unused)
