"""
Configuration and settings management for the Local Database Question-Answering System.
"""

import os
from pathlib import Path
from pydantic import BaseModel

BASE_DIR = Path(__file__).resolve().parent.parent
SAMPLE_DATA_DIR = BASE_DIR / "app" / "sample_data"
UPLOAD_DIR = BASE_DIR / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

class AppSettings(BaseModel):
    # App Information
    app_name: str = "Local DB QA System"
    version: str = "1.0.0"
    
    # LLM Settings
    llm_provider: str = os.getenv("LLM_PROVIDER", "gemini")  # gemini, openai, ollama, offline
    gemini_api_key: str = os.getenv("GEMINI_API_KEY", "")
    openai_api_key: str = os.getenv("OPENAI_API_KEY", "")
    ollama_url: str = os.getenv("OLLAMA_URL", "http://localhost:11434")
    model_name: str = os.getenv("MODEL_NAME", "gemini-2.5-flash")
    
    # Execution & Safety
    max_query_rows: int = 100
    query_timeout_seconds: int = 10
    enforce_read_only: bool = True
    
    # Active Database
    default_database_id: str = "college_records"

settings = AppSettings()
