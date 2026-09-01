"""
Main FastAPI Application Entry Point.
Serves the REST API and the modern interactive React web application.
"""

import os
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from app.api.routes_query import router as query_router
from app.api.routes_database import router as db_router
from app.api.routes_history import router as history_router
from app.api.routes_settings import router as settings_router
from app.sample_data.init_databases import init_all
from app.config import settings

from contextlib import asynccontextmanager

BASE_DIR = Path(__file__).resolve().parent.parent
FRONTEND_DIR = BASE_DIR.parent / "frontend"

@asynccontextmanager
async def lifespan(app: FastAPI):
    db_file = BASE_DIR / "app" / "sample_data" / "college_records.db"
    if not db_file.exists():
        print("Initializing sample databases on startup...")
        init_all()
    yield

app = FastAPI(
    title="Local Database Question-Answering System",
    description="AI-powered assistant that converts natural language into safe, validated SQL queries and provides conversational answers.",
    version="1.0.0",
    lifespan=lifespan
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API Routers
app.include_router(query_router)
app.include_router(db_router)
app.include_router(history_router)
app.include_router(settings_router)

# Serve static frontend files
if FRONTEND_DIR.exists():
    app.mount("/static", StaticFiles(directory=str(FRONTEND_DIR)), name="static")

@app.get("/")
async def serve_index():
    index_file = FRONTEND_DIR / "index.html"
    if index_file.exists():
        return FileResponse(str(index_file))
    return {
        "status": "online",
        "message": "Local Database Question-Answering System API is running.",
        "docs": "/docs"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "version": "1.0.0"}
