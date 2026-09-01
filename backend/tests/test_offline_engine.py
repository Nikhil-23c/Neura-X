import pytest
from app.core.database_manager import db_manager
from app.core.offline_engine import OfflineNLEngine

@pytest.fixture
def college_schema():
    return db_manager.introspect_schema("college_records")

def test_top_students_cgpa(college_schema):
    query = "Show me the top 5 students with highest CGPA"
    res = OfflineNLEngine.analyze_and_generate(query, college_schema)
    assert res["intent"] == "Get Top Records"
    assert "Students" in res["entities"]
    assert "CGPA" in res["entities"]
    assert "ORDER BY cgpa DESC" in res["sql"]
    assert "LIMIT 5" in res["sql"]

def test_low_attendance_filter(college_schema):
    query = "List all students with attendance less than 75%"
    res = OfflineNLEngine.analyze_and_generate(query, college_schema)
    assert "Attendance" in res["entities"]
    assert "< 75" in res["sql"]

def test_average_cgpa_per_department(college_schema):
    query = "What is the average CGPA per department?"
    res = OfflineNLEngine.analyze_and_generate(query, college_schema)
    assert "departments" in res["sql"].lower()
    assert "avg(s.cgpa)" in res["sql"].lower()
