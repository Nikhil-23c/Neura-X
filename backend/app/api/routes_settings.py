"""
Application Settings & Configuration Router.
Allows real-time updating of LLM provider keys and parameters.
"""

from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from app.config import settings

router = APIRouter(prefix="/api/settings", tags=["settings"])

class UpdateSettingsRequest(BaseModel):
    llm_provider: Optional[str] = None
    gemini_api_key: Optional[str] = None
    openai_api_key: Optional[str] = None
    ollama_url: Optional[str] = None
    model_name: Optional[str] = None
    default_database_id: Optional[str] = None

@router.get("")
def get_current_settings():
    """Get current configuration status (API keys masked for security)."""
    return {
        "llm_provider": settings.llm_provider,
        "has_gemini_key": bool(settings.gemini_api_key),
        "has_openai_key": bool(settings.openai_api_key),
        "ollama_url": settings.ollama_url,
        "model_name": settings.model_name,
        "default_database_id": settings.default_database_id,
        "max_query_rows": settings.max_query_rows,
        "enforce_read_only": settings.enforce_read_only
    }

@router.post("")
def update_settings(req: UpdateSettingsRequest):
    """Update settings in-memory."""
    if req.llm_provider is not None:
        settings.llm_provider = req.llm_provider
    if req.gemini_api_key is not None:
        settings.gemini_api_key = req.gemini_api_key.strip()
    if req.openai_api_key is not None:
        settings.openai_api_key = req.openai_api_key.strip()
    if req.ollama_url is not None:
        settings.ollama_url = req.ollama_url.strip()
    if req.model_name is not None:
        settings.model_name = req.model_name.strip()
    if req.default_database_id is not None:
        settings.default_database_id = req.default_database_id

    return {
        "status": "success",
        "message": "Settings updated successfully.",
        "settings": get_current_settings()
    }
