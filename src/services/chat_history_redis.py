import redis
from src.memory.redis_memory import redis_client as r
from src.config.config import (
    REDIS_HOST,
    REDIS_PORT
)

def save_message(session_id, role, content):
    r.rpush(
        f"session_id:{session_id}",
        f"{role}:{content}"
    )
    
def get_chat_history(session_id):
    chat_history = r.lrange(
        f"session_id:{session_id}",
        -10,
        -1
    )
    return [
        msg.decode("utf-8")
        for msg in chat_history
    ]