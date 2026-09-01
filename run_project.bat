@echo off
title NEURA X - Local Database Question-Answering System (PS7)
echo ======================================================================
echo   NEURA X - Local Database Question-Answering System (PS7)
echo   HackWithAMYPO 2026 Stage 1 Submission
echo ======================================================================
echo.

cd /d "%~dp0backend"

echo [1/3] Verifying Python dependencies...
python -m pip install -r requirements.txt --quiet

echo.
echo [2/3] Opening Web Application in your default browser...
timeout /t 2 /nobreak >nul
start "" "http://localhost:8000"

echo.
echo [3/3] Starting FastAPI Backend Server on http://localhost:8000 ...
echo ----------------------------------------------------------------------
echo   Web UI:   http://localhost:8000
echo   API Docs: http://localhost:8000/docs
echo ----------------------------------------------------------------------
echo [Press Ctrl+C to stop the server at any time]
echo.

python run.py

pause
