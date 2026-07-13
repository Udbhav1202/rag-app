# DocChat AI - RAG Based Document Chat Application

## Overview

DocChat AI is a Retrieval-Augmented Generation (RAG) application that allows users to upload documents and ask questions about their content. The application extracts text, generates embeddings, stores them in a vector database, retrieves relevant context, and generates accurate responses using OpenAI LLMs.

## Features

* User Authentication with JWT
* Upload PDF, DOCX, and TXT files
* Background document processing
* Text extraction and chunking
* OpenAI Embeddings
* ChromaDB Vector Storage
* Semantic Search
* Context-Aware Question Answering
* Persistent Chat History using PostgreSQL
* Redis Caching
* Dockerized Deployment
* Token Usage and Cost Tracking
* User-based Document Isolation

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

User Uploads Document
↓
Text Extraction
↓
Chunking
↓
OpenAI Embeddings
↓
ChromaDB Storage
↓
User Question
↓
Semantic Search
↓
Context Retrieval
↓
OpenAI LLM
↓
Final Answer

FastAPI
      │
 ┌────┼────┐
 ▼    ▼    ▼
PostgreSQL
Redis
ChromaDB

---

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
OPENAI_API_KEY=your_api_key

SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

CHAT_MODEL=gpt-4.1-mini
EMBEDDING_MODEL=text-embedding-3-small

REDIS_HOST=localhost
REDIS_PORT=6379

POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=
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

* Retrieval-Augmented Generation (RAG)
* FastAPI Development
* JWT Authentication
* SQLAlchemy ORM
* ChromaDB
* OpenAI API Integration
* Redis Caching
* Background Tasks
* Docker Containerization
* Production-Oriented Backend Architecture

---

## Future Improvements

* Rate Limiting
* Document Management APIs
* Automated Testing

---

## Author

Udbhav Srivastava
