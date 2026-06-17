# RAG Document Chat Application

## Overview

A production-style Retrieval-Augmented Generation (RAG) application that allows users to upload documents and chat with them using AI.

The application extracts text from documents, generates embeddings, stores them in ChromaDB, retrieves relevant chunks during conversations, and generates contextual answers using OpenAI models.

---

## Features

* User Authentication (JWT)
* User Registration & Login
* PDF, DOCX, and TXT Support
* ChromaDB Vector Storage
* OpenAI Embeddings
* Document-based Question Answering
* Redis Chat Memory
* User-level Document Isolation
* Source Citations
* Delete Document API
* Streaming Responses
* Background Document Processing
* Logging & Monitoring
* Docker & Docker Compose Support

---

## Tech Stack

### Backend

* FastAPI
* Python

### Database

* SQLite
* SQLAlchemy

### AI / RAG

* LangChain
* OpenAI
* ChromaDB

### Caching & Memory

* Redis

### Authentication

* JWT
* Passlib
* Bcrypt

### Deployment

* Docker
* Docker Compose

---

## Architecture

User → FastAPI → Authentication Layer

Upload Flow:

User → Upload API → Text Extraction → Chunking → Embeddings → ChromaDB

Chat Flow:

User Question → Retrieval → ChromaDB → Relevant Chunks → OpenAI → Response

Memory Flow:

User → Redis Chat History → Context Preservation

---

## API Endpoints

### Authentication

POST /register

POST /login

### Document Management

POST /upload

DELETE /delete/{document_id}

### Chat

POST /chat

POST /chat/stream

---

## Project Structure

src/

├── config/

├── database/

├── rag/

├── routes/

├── schemas/

├── services/

├── utils/

├── main.py

---

## Running Locally

### Clone Repository

git clone <repository-url>

cd rag-app

### Create Virtual Environment

python -m venv venv

### Activate Virtual Environment

Windows:

venv\Scripts\activate

### Install Dependencies

pip install -r requirements.txt

### Configure Environment Variables

Create a .env file and add:

OPENAI_API_KEY=your_key

REDIS_HOST=localhost

REDIS_PORT=6379

SECRET_KEY=your_secret

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=30

### Run Application

uvicorn src.main:app --reload

---

## Docker Setup

### Build Image

docker build -t rag-app .

### Run Using Docker Compose

docker compose up

Application:

http://localhost:8000/docs

---

## Future Improvements

* PostgreSQL Integration
* Celery Background Workers
* Document Processing Status Tracking
* Multi-Document Collections
* CI/CD Pipeline
* Cloud Deployment
* Role-Based Access Control

---

## Author

Udbhav Srivastava

