import redis

r = redis.Redis(host="localhost", port=6379, db=0)

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