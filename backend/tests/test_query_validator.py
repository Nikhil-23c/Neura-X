import pytest
from app.core.query_validator import QueryValidator

def test_valid_select_query():
    sql = "SELECT name, cgpa FROM students ORDER BY cgpa DESC LIMIT 5;"
    is_valid, sanitized, err = QueryValidator.sanitize_and_validate(sql)
    assert is_valid is True
    assert err is None
    assert "LIMIT 5" in sanitized

def test_automatic_limit_addition():
    sql = "SELECT name, cgpa FROM students"
    is_valid, sanitized, err = QueryValidator.sanitize_and_validate(sql, default_limit=50)
    assert is_valid is True
    assert "LIMIT 50" in sanitized

def test_block_drop_table():
    sql = "DROP TABLE students;"
    is_valid, sanitized, err = QueryValidator.sanitize_and_validate(sql)
    assert is_valid is False
    assert "Security Violation" in err

def test_block_delete_records():
    sql = "DELETE FROM students WHERE student_id = 101;"
    is_valid, sanitized, err = QueryValidator.sanitize_and_validate(sql)
    assert is_valid is False
    assert "Security Violation" in err

def test_block_update_records():
    sql = "UPDATE students SET cgpa = 10.0 WHERE name = 'Arun';"
    is_valid, sanitized, err = QueryValidator.sanitize_and_validate(sql)
    assert is_valid is False
    assert "Security Violation" in err

def test_block_insert_records():
    sql = "INSERT INTO students (name, cgpa) VALUES ('Hacker', 10.0);"
    is_valid, sanitized, err = QueryValidator.sanitize_and_validate(sql)
    assert is_valid is False
    assert "Security Violation" in err

def test_block_multiple_statements():
    sql = "SELECT * FROM students; DROP TABLE students;"
    is_valid, sanitized, err = QueryValidator.sanitize_and_validate(sql)
    assert is_valid is False
    assert "Multiple SQL statements" in err

def test_with_cte_query():
    sql = "WITH top_students AS (SELECT name, cgpa FROM students WHERE cgpa > 9.0) SELECT * FROM top_students;"
    is_valid, sanitized, err = QueryValidator.sanitize_and_validate(sql)
    assert is_valid is True
    assert err is None
