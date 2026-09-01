"""
Query Audit Log and History Router.
Tracks executed queries, timestamps, latency metrics, and success/error status.
"""

from fastapi import APIRouter
from typing import List, Dict, Any
from datetime import datetime

router = APIRouter(prefix="/api/history", tags=["history"])

# In-memory query audit history store
AUDIT_LOGS: List[Dict[str, Any]] = []

def record_audit_log(
    question: str,
    database_id: str,
    sql: str,
    status: str,
    row_count: int,
    execution_time_ms: float,
    provider: str,
    error: str = None
):
    entry = {
        "id": len(AUDIT_LOGS) + 1,
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "question": question,
        "database_id": database_id,
        "sql": sql,
        "status": status,
        "row_count": row_count,
        "execution_time_ms": execution_time_ms,
        "provider": provider,
        "error": error
    }
    AUDIT_LOGS.insert(0, entry)
    # Keep last 100 entries
    if len(AUDIT_LOGS) > 100:
        AUDIT_LOGS.pop()

@router.get("", response_model=List[Dict[str, Any]])
def get_history():
    """Retrieve query execution audit trail."""
    return AUDIT_LOGS

@router.delete("")
def clear_history():
    """Clear query history."""
    AUDIT_LOGS.clear()
    return {"message": "Audit history cleared successfully."}
