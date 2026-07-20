import redis
from src.config.config import (
    REDIS_HOST,
    REDIS_PORT
)

r = redis.Redis(
    host=REDIS_HOST,
    port=REDIS_PORT,
    db=0
)