@echo off
title NEURA X - Local Database Question-Answering System (PS7)
echo ======================================================================
echo   NEURA X - Local Database Question-Answering System (PS7)
echo   HackWithAMYPO 2026 Stage 1
echo ======================================================================
echo.

cd /d "%~dp0backend"
echo [1/2] Installing required Python dependencies...
python -m pip install -r requirements.txt

echo.
echo [2/2] Launching FastAPI Web Application on http://localhost:8000 ...
python run.py

pause
