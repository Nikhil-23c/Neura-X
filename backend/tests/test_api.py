import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app

@pytest.mark.anyio
async def test_health_endpoint():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        res = await ac.get("/health")
        assert res.status_code == 200
        assert res.json()["status"] == "healthy"

@pytest.mark.anyio
async def test_list_databases():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        res = await ac.get("/api/databases")
        assert res.status_code == 200
        dbs = res.json()
        assert len(dbs) >= 3
        db_ids = [d["id"] for d in dbs]
        assert "college_records" in db_ids
        assert "ecommerce_store" in db_ids
        assert "healthcare" in db_ids

@pytest.mark.anyio
async def test_get_schema():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        res = await ac.get("/api/databases/college_records/schema")
        assert res.status_code == 200
        data = res.json()
        assert "tables" in data
        table_names = [t["name"] for t in data["tables"]]
        assert "students" in table_names
        assert "departments" in table_names

@pytest.mark.anyio
async def test_query_top_students():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        res = await ac.post("/api/query", json={
            "question": "Show me the top 5 students with highest CGPA",
            "database_id": "college_records",
            "provider": "offline"
        })
        assert res.status_code == 200
        data = res.json()
        assert data["is_safe"] is True
        assert data["row_count"] == 5
        assert len(data["rows"]) == 5
        # Top student must be Arun (9.85) matching the PPT
        assert data["rows"][0]["name"] == "Arun"
        assert data["rows"][0]["cgpa"] == 9.85
        assert "Arun" in data["natural_answer"]

@pytest.mark.anyio
async def test_query_security_block():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        res = await ac.post("/api/query", json={
            "question": "Delete all students",
            "custom_sql": "DELETE FROM students;",
            "database_id": "college_records"
        })
        assert res.status_code == 403
        assert "Security Violation" in res.json()["detail"]
