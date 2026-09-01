"""
Offline Heuristic & Rule-Based NL2SQL Engine.
Provides high-accuracy zero-shot SQL generation, intent detection, and entity extraction
without requiring external LLM API keys.
"""

import re
from typing import Dict, Any, Tuple, Optional, List

class OfflineNLEngine:
    @staticmethod
    def analyze_and_generate(user_query: str, schema_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Extracts intent, entities, and generates SQL query matching the database schema.
        """
        q_lower = user_query.lower().strip()
        tables = schema_data.get("tables", [])
        table_map = {t["name"].lower(): t for t in tables}
        
        intent = "General Query"
        entities: List[str] = []
        sort_by = None
        limit = None
        generated_sql = ""

        # 1. Detect Limit (e.g., "top 5", "first 10", "top 3")
        limit_match = re.search(r'\b(?:top|first|limit)\s+(\d+)\b', q_lower)
        if limit_match:
            limit = int(limit_match.group(1))

        # Check College Records patterns
        if "students" in table_map:
            # Pattern: Top N students with highest CGPA (Exact PPT Example)
            if ("cgpa" in q_lower or "gpa" in q_lower or "rank" in q_lower or "topper" in q_lower or "best" in q_lower) and ("top" in q_lower or "highest" in q_lower or "order" in q_lower):
                intent = "Get Top Records"
                entities = ["Students", "CGPA"]
                lim = limit if limit else 5
                sort_by = "CGPA Desc"
                generated_sql = f"SELECT name, cgpa FROM students ORDER BY cgpa DESC LIMIT {lim};"
                return {
                    "intent": intent,
                    "entities": entities,
                    "limit": lim,
                    "sort_by": sort_by,
                    "sql": generated_sql
                }

            # Pattern: Students with low attendance (< 75% or specific threshold)
            if "attendance" in q_lower and ("less" in q_lower or "below" in q_lower or "under" in q_lower or "<" in q_lower or "shortage" in q_lower or "low" in q_lower):
                intent = "Filter Records by Threshold"
                entities = ["Students", "Attendance"]
                thresh_match = re.search(r'(\d+)', q_lower)
                threshold = int(thresh_match.group(1)) if thresh_match else 75
                generated_sql = f"""SELECT s.name, s.email, a.attendance_percentage, a.attended_classes, a.total_classes 
FROM students s 
JOIN attendance a ON s.student_id = a.student_id 
WHERE a.attendance_percentage < {threshold} 
ORDER BY a.attendance_percentage ASC;"""
                return {
                    "intent": intent,
                    "entities": entities,
                    "limit": limit or 10,
                    "sort_by": "Attendance Percentage ASC",
                    "sql": generated_sql
                }

            # Pattern: Average CGPA per department
            if "department" in q_lower and ("average" in q_lower or "avg" in q_lower or "cgpa" in q_lower or "mean" in q_lower):
                intent = "Aggregation Group By"
                entities = ["Departments", "Students", "Average CGPA"]
                generated_sql = """SELECT d.dept_name, COUNT(s.student_id) as total_students, ROUND(AVG(s.cgpa), 2) as average_cgpa 
FROM departments d 
JOIN students s ON d.dept_id = s.dept_id 
GROUP BY d.dept_name 
ORDER BY average_cgpa DESC;"""
                return {
                    "intent": intent,
                    "entities": entities,
                    "limit": None,
                    "sort_by": "Average CGPA DESC",
                    "sql": generated_sql
                }

            # Pattern: Department with most/highest students
            if "department" in q_lower and ("count" in q_lower or "how many" in q_lower or "most students" in q_lower or "number of students" in q_lower):
                intent = "Aggregation Count"
                entities = ["Departments", "Student Count"]
                generated_sql = """SELECT d.dept_name, COUNT(s.student_id) as student_count 
FROM departments d 
JOIN students s ON d.dept_id = s.dept_id 
GROUP BY d.dept_name 
ORDER BY student_count DESC;"""
                return {
                    "intent": intent,
                    "entities": entities,
                    "limit": limit,
                    "sort_by": "Student Count DESC",
                    "sql": generated_sql
                }

            # Pattern: List faculty by salary or department
            if "faculty" in q_lower or "professor" in q_lower or "teacher" in q_lower or "salary" in q_lower:
                intent = "Filter and Sort Records"
                entities = ["Faculty", "Salary", "Experience"]
                generated_sql = """SELECT f.name, f.designation, d.dept_name, f.salary, f.experience_years 
FROM faculty f 
JOIN departments d ON f.dept_id = d.dept_id 
ORDER BY f.salary DESC;"""
                return {
                    "intent": intent,
                    "entities": entities,
                    "limit": limit or 10,
                    "sort_by": "Salary DESC",
                    "sql": generated_sql
                }

            # Pattern: All courses offered
            if "course" in q_lower or "subject" in q_lower:
                intent = "List Courses"
                entities = ["Courses", "Credits"]
                generated_sql = """SELECT c.course_id, c.course_name, d.dept_name, c.credits, c.semester 
FROM courses c 
JOIN departments d ON c.dept_id = d.dept_id;"""
                return {
                    "intent": intent,
                    "entities": entities,
                    "limit": limit,
                    "sort_by": None,
                    "sql": generated_sql
                }

            # Pattern: Search for a specific student name
            name_match = re.search(r'\b(?:student|student named|about|details of)\s+([a-zA-Z]+)\b', q_lower)
            if name_match:
                name_query = name_match.group(1).capitalize()
                intent = "Filter by Entity Name"
                entities = ["Students", f"Name: {name_query}"]
                generated_sql = f"SELECT * FROM students WHERE name LIKE '%{name_query}%';"
                return {
                    "intent": intent,
                    "entities": entities,
                    "limit": 1,
                    "sort_by": None,
                    "sql": generated_sql
                }

        # Check E-Commerce Records patterns
        if "products" in table_map and "orders" in table_map:
            # Pattern: Top selling or highest priced products
            if "product" in q_lower or "price" in q_lower or "expensive" in q_lower or "cost" in q_lower:
                intent = "Get Top Products"
                entities = ["Products", "Price", "Rating"]
                lim = limit if limit else 5
                generated_sql = f"SELECT name, price, stock_quantity, rating FROM products ORDER BY price DESC LIMIT {lim};"
                return {
                    "intent": intent,
                    "entities": entities,
                    "limit": lim,
                    "sort_by": "Price DESC",
                    "sql": generated_sql
                }

            # Pattern: Total sales or orders
            if "order" in q_lower or "sale" in q_lower or "revenue" in q_lower:
                intent = "Order Summary & Revenue"
                entities = ["Orders", "Total Amount"]
                generated_sql = """SELECT status, COUNT(order_id) as total_orders, ROUND(SUM(total_amount), 2) as total_revenue 
FROM orders 
GROUP BY status;"""
                return {
                    "intent": intent,
                    "entities": entities,
                    "limit": None,
                    "sort_by": "Total Revenue DESC",
                    "sql": generated_sql
                }

            # Pattern: Customers
            if "customer" in q_lower or "tier" in q_lower or "membership" in q_lower:
                intent = "Customer Distribution"
                entities = ["Customers", "Membership Tier"]
                generated_sql = "SELECT membership_tier, COUNT(customer_id) as customer_count FROM customers GROUP BY membership_tier;"
                return {
                    "intent": intent,
                    "entities": entities,
                    "limit": None,
                    "sort_by": "Customer Count DESC",
                    "sql": generated_sql
                }

        # Check Healthcare Records patterns
        if "patients" in table_map and "doctors" in table_map:
            # Pattern: Doctors by specialization or experience
            if "doctor" in q_lower or "specialization" in q_lower or "fee" in q_lower:
                intent = "List Doctors"
                entities = ["Doctors", "Specialization", "Experience"]
                generated_sql = """SELECT d.name, d.specialization, dep.dept_name, d.consultation_fee, d.experience_years 
FROM doctors d 
JOIN departments dep ON d.dept_id = dep.dept_id 
ORDER BY d.experience_years DESC;"""
                return {
                    "intent": intent,
                    "entities": entities,
                    "limit": limit or 5,
                    "sort_by": "Experience DESC",
                    "sql": generated_sql
                }

            # Pattern: Patients blood group / admission
            if "patient" in q_lower or "blood" in q_lower:
                intent = "Patient Demographics"
                entities = ["Patients", "Blood Group"]
                generated_sql = "SELECT blood_group, COUNT(patient_id) as patient_count FROM patients GROUP BY blood_group;"
                return {
                    "intent": intent,
                    "entities": entities,
                    "limit": None,
                    "sort_by": "Patient Count DESC",
                    "sql": generated_sql
                }

        # Generic Fallback based on schema
        primary_table = tables[0]["name"] if tables else "dataset"
        # Find numeric column if any
        num_col = None
        text_col = None
        for col in tables[0].get("columns", []):
            t = col["type"].upper()
            if not num_col and any(nt in t for nt in ["INT", "REAL", "FLOAT", "DOUBLE", "NUMERIC"]):
                if not col["is_primary_key"]:
                    num_col = col["name"]
            if not text_col and any(tt in t for tt in ["CHAR", "TEXT", "VARCHAR"]):
                text_col = col["name"]

        lim_clause = f" LIMIT {limit}" if limit else " LIMIT 10"
        order_clause = f" ORDER BY {num_col} DESC" if num_col and ("top" in q_lower or "highest" in q_lower) else ""
        generated_sql = f'SELECT * FROM "{primary_table}"{order_clause}{lim_clause};'

        return {
            "intent": "Schema Fallback Query",
            "entities": [primary_table],
            "limit": limit or 10,
            "sort_by": order_clause.replace(" ORDER BY ", "") if order_clause else None,
            "sql": generated_sql
        }
