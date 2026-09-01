"""
Database Management & Schema Catalog Router.
Provides endpoints to list databases, inspect schemas, register custom connections, and upload CSVs.
"""

import os
import shutil
from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from app.core.database_manager import db_manager
from app.config import UPLOAD_DIR

router = APIRouter(prefix="/api/databases", tags=["databases"])

class ConnectDBRequest(BaseModel):
    name: str
    db_type: str  # sqlite, postgresql, mysql
    uri: Optional[str] = None
    file_path: Optional[str] = None
    description: Optional[str] = None

@router.get("", response_model=List[Dict[str, Any]])
def list_databases():
    """List all available registered databases."""
    return db_manager.list_databases()

@router.get("/{database_id}/schema", response_model=Dict[str, Any])
def get_database_schema(database_id: str):
    """Retrieve detailed schema metadata including tables, columns, keys, and row previews."""
    try:
        return db_manager.introspect_schema(database_id)
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Failed to inspect database '{database_id}': {str(e)}")

@router.post("/connect")
def connect_database(req: ConnectDBRequest):
    """Connect a custom database (PostgreSQL, MySQL, SQLite URI)."""
    db_id = f"custom_{req.name.lower().replace(' ', '_')}"
    try:
        if req.db_type == "sqlite" and req.file_path:
            db_info = db_manager.register_custom_sqlite(
                db_id=db_id,
                name=req.name,
                file_path=req.file_path,
                description=req.description or "User custom SQLite connection."
            )
        elif req.uri:
            db_info = db_manager.register_connection_uri(
                db_id=db_id,
                name=req.name,
                uri=req.uri,
                db_type=req.db_type
            )
        else:
            raise HTTPException(status_code=400, detail="Must provide URI or valid SQLite file path.")
        
        # Test schema introspection
        schema = db_manager.introspect_schema(db_id)
        return {"status": "success", "database": db_info, "tables_found": len(schema["tables"])}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Could not connect to database: {str(e)}")

@router.post("/upload-csv")
async def upload_csv_file(
    file: UploadFile = File(...),
    table_name: Optional[str] = Form(None)
):
    """Upload a CSV dataset and auto-convert it into a queryable SQL database."""
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only .csv files are supported.")

    save_name = f"{table_name or file.filename.rsplit('.', 1)[0]}"
    temp_path = UPLOAD_DIR / file.filename

    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        db_id = db_manager.import_csv_to_sqlite(
            csv_file_path=str(temp_path),
            table_name=save_name
        )
        schema = db_manager.introspect_schema(db_id)
        return {
            "status": "success",
            "database_id": db_id,
            "table_name": save_name,
            "columns": [c["name"] for c in schema["tables"][0]["columns"]],
            "row_count": schema["tables"][0]["row_count"]
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to import CSV: {str(e)}")
    finally:
        if temp_path.exists():
            try:
                os.remove(temp_path)
            except Exception:
                pass
