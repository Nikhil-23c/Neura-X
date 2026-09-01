# NEURA X — Local Database Question-Answering System (PS7)
**HackWithAMYPO 2026 — Stage 1 Submission**  
**Team Members:** Shri Kavin D K (AI & Backend) & Nikhil Sanjay C (Frontend & Database)  
**Institution:** Sri Krishna College of Engineering and Technology

---

## 🌟 Overview

The **Local Database Question-Answering System** is an AI-powered enterprise assistant that turns natural language questions into safe, validated SQL queries and presents instant conversational answers, raw data tables, and automated chart visualizations.

---

## 🚀 Key Features

1. **5-Stage Intelligent Pipeline**:
   - **User Query Input**: Text search with one-click presets and **Voice-to-Text (Web Speech API)**.
   - **Natural Language Understanding (NLU)**: Intent detection, entity extraction, and schema context mapping.
   - **AI-Powered Query Generation**: Schema-aware prompt engineering supporting **Google Gemini API**, **OpenAI**, **Ollama**, with a **smart zero-setup offline heuristic fallback engine**.
   - **Security Guardrail & Sandbox**: Strict read-only enforcement blocking destructive SQL commands (`DROP`, `DELETE`, `UPDATE`, `INSERT`, `ALTER`, `TRUNCATE`, `EXEC`), preventing SQL injection chaining, and auto-applying `LIMIT` clauses.
   - **Multi-Modal Answer Delivery**: Natural language conversational answers, interactive sortable data grid, and automated **Chart.js** visualizations (Bar, Line, Doughnut).

2. **Pre-Loaded Realistic Databases**:
   - **College Academic Records**: Students (including Arun 9.85, Divya 9.62, Karthik 9.41, Meena 9.32, Rohit 9.21), Departments, Courses, Enrollments, Faculty, and Attendance.
   - **E-Commerce Online Store**: Products, Categories, Customers, Orders, and Order Items.
   - **Healthcare System**: Patients, Doctors, Appointments, and Billings.

3. **Multi-Database & CSV Importer**:
   - Seamlessly upload any `.csv` dataset — automatically converted into an SQLite relational table ready for natural language querying!
   - Connect custom SQLite files or PostgreSQL / MySQL connection strings.

4. **Schema Metadata Catalog**:
   - Interactive table explorer showing column names, data types, primary keys (`[PK]`), foreign keys (`[FK]`), row counts, and live row previews.

5. **Audit Trail & Latency Monitoring**:
   - Chronological logs tracking query performance in milliseconds, row counts, and security status.

---

## 🛠️ Tech Stack

- **Backend**: Python, FastAPI, SQLAlchemy, SQLite, Pydantic, sqlparse, google-genai
- **Frontend**: React 18, Tailwind CSS, Chart.js, Lucide Icons, Web Speech API
- **Testing**: Pytest, HTTPX

---

## 🏃 Quick Start

### 1. One-Click Launch (Windows)
Double-click `run_project.bat` (or `start.bat`) in the root folder `D:\Neura X`.  
This script will automatically:
1. Check and install all dependencies.
2. Launch the FastAPI server on port 8000.
3. Automatically open `http://localhost:8000` in your default browser!

```powershell
cd "D:\Neura X\backend"
python run.py
```

Open your browser and navigate to:
👉 **`http://localhost:8000`**

Interactive API Swagger docs are available at:
👉 **`http://localhost:8000/docs`**

---

## 🧪 Running Automated Tests

Run the full automated test suite (16 tests covering SQL safety, heuristic NL2SQL, and FastAPI endpoints):

```powershell
cd C:\Users\hp\.gemini\antigravity\scratch\local-db-qa-system\backend
python -m pytest tests -v
```
