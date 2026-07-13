# DocChat AI - RAG Based Document Chat Application

## Overview

DocChat AI is a Retrieval-Augmented Generation (RAG) application that allows users to upload documents and ask questions about their content. The application extracts text, generates embeddings, stores them in a vector database, retrieves relevant context, and generates accurate responses using OpenAI LLMs.

## Features

- JWT-based User Authentication
- Upload PDF, DOCX, and TXT Documents
- Background Document Processing
- Text Extraction and Intelligent Chunking
- OpenAI Embeddings Generation
- ChromaDB Vector Storage
- Semantic Search using Vector Similarity
- Context-Aware Question Answering (RAG)
- Persistent Chat History using PostgreSQL
- Redis Integration (Cache-Aside Pattern Implementation)
- Docker & Docker Compose Support
- Token Usage and Cost Tracking
- User-Specific Document Isolation

---

## Tech Stack

### Backend

* FastAPI
* Python

### Authentication

* JWT Authentication
* Passlib
* Python-Jose

### Database

* PostgreSQL
* SQLAlchemy

### Vector Database

* ChromaDB

### AI & RAG

* OpenAI
* LangChain
* OpenAI Embeddings

### Caching

* Redis

### Containerization

* Docker
* Docker Compose

---

## Architecture

```
                +------------------+
                |   React (UI)     |
                +--------+---------+
                         |
                         v
                +------------------+
                |     FastAPI      |
                +--------+---------+
                         |
      +------------------+------------------+
      |                  |                  |
      v                  v                  v
+-------------+   +-------------+   +-------------+
| PostgreSQL  |   |    Redis    |   |  ChromaDB   |
| Users &     |   |   Caching   |   | Embeddings  |
| Chat History|   |             |   | & Retrieval |
+-------------+   +-------------+   +-------------+
                         |
                         v
                +------------------+
                |   OpenAI APIs    |
                | Chat & Embeddings|
                +------------------+
```
---

## Project Structure

```
DocChatAI/
├── src/
│   ├── config/
│   ├── database/
│   ├── rag/
│   ├── routes/
│   ├── schemas/
│   ├── services/
│   ├── utils/
│   └── main.py
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
├── README.md
└── .gitignore
```

## API Endpoints

### Authentication

#### Register

POST /register

#### Login

POST /login

---

### Documents

#### Upload Document

POST /upload

Supported Formats:

* PDF
* DOCX
* TXT

---

### Chat

#### Ask Questions

POST /chat

Example Request:

```json
{
    "session_id": "session-id",
    "question": "What is this document about?"
}
```

---

## Environment Variables

Create a `.env` file:

```env
OPENAI_API_KEY=your_openai_api_key

POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=docchat_ai
POSTGRES_HOST=localhost
POSTGRES_PORT=5432

SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

CHAT_MODEL=gpt-4.1-mini
EMBEDDING_MODEL=text-embedding-3-small

REDIS_HOST=localhost
REDIS_PORT=6379
```

---

## Installation

Clone Repository

```bash
git clone <repository-url>
cd rag-app
```

Install Dependencies

```bash
pip install -r requirements.txt
```

Run Application

```bash
uvicorn src.main:app --reload
```

Swagger Documentation

```text
http://127.0.0.1:8000/docs
```

---

## Docker Setup

Build Image

```bash
docker build -t rag-app .
```

Run Container

```bash
docker run -p 8000:8000 --env-file .env rag-app
```

Run with Docker Compose

```bash
docker compose up
```

---

## Key Learnings

- Retrieval-Augmented Generation (RAG)
- FastAPI Backend Development
- JWT Authentication
- SQLAlchemy ORM
- PostgreSQL Integration
- Redis Cache-Aside Pattern
- ChromaDB Vector Database
- LangChain
- OpenAI API Integration
- Docker & Docker Compose
- Production-Oriented Backend Architecture

---

## Future Improvements

* Rate Limiting
* Document Management APIs
* Automated Testing

---

## Author

Udbhav Srivastava
