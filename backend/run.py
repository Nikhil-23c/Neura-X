"""
Convenience startup script for launching the FastAPI backend server.
"""

import sys
import os
from pathlib import Path

# Add backend directory to sys.path
BASE_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(BASE_DIR))

import uvicorn

if __name__ == "__main__":
    print("=" * 65)
    print("🚀 Starting Local Database Question-Answering System (PS7)")
    print("🌐 Web Application: http://localhost:8000")
    print("📖 Interactive API Docs: http://localhost:8000/docs")
    print("=" * 65)
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
