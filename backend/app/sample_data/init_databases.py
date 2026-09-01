"""
Initializes sample SQLite databases with rich, realistic data for:
1. College Records (students, departments, courses, enrollments, attendance, faculty)
2. E-Commerce Store (customers, products, orders, order_items, categories)
3. Healthcare Records (patients, doctors, appointments, departments, billings)
"""

import os
import sqlite3
import random

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def init_college_db():
    db_path = os.path.join(BASE_DIR, "college_records.db")
    if os.path.exists(db_path):
        os.remove(db_path)
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Tables
    cursor.execute("""
    CREATE TABLE departments (
        dept_id INTEGER PRIMARY KEY,
        dept_name TEXT NOT NULL,
        hod TEXT NOT NULL,
        building TEXT NOT NULL,
        budget REAL NOT NULL
    );
    """)

    cursor.execute("""
    CREATE TABLE students (
        student_id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        dept_id INTEGER NOT NULL,
        cgpa REAL NOT NULL,
        year INTEGER NOT NULL,
        gender TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        city TEXT NOT NULL,
        FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
    );
    """)

    cursor.execute("""
    CREATE TABLE courses (
        course_id TEXT PRIMARY KEY,
        course_name TEXT NOT NULL,
        dept_id INTEGER NOT NULL,
        credits INTEGER NOT NULL,
        semester INTEGER NOT NULL,
        FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
    );
    """)

    cursor.execute("""
    CREATE TABLE faculty (
        faculty_id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        dept_id INTEGER NOT NULL,
        designation TEXT NOT NULL,
        salary REAL NOT NULL,
        experience_years INTEGER NOT NULL,
        FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
    );
    """)

    cursor.execute("""
    CREATE TABLE enrollments (
        enrollment_id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER NOT NULL,
        course_id TEXT NOT NULL,
        semester INTEGER NOT NULL,
        grade TEXT NOT NULL,
        marks INTEGER NOT NULL,
        FOREIGN KEY (student_id) REFERENCES students(student_id),
        FOREIGN KEY (course_id) REFERENCES courses(course_id)
    );
    """)

    cursor.execute("""
    CREATE TABLE attendance (
        attendance_id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER NOT NULL,
        course_id TEXT NOT NULL,
        total_classes INTEGER NOT NULL,
        attended_classes INTEGER NOT NULL,
        attendance_percentage REAL NOT NULL,
        FOREIGN KEY (student_id) REFERENCES students(student_id),
        FOREIGN KEY (course_id) REFERENCES courses(course_id)
    );
    """)

    # Seed Departments
    departments = [
        (1, 'Computer Science and Engineering', 'Dr. Ramesh Kumar', 'Block A', 1500000.0),
        (2, 'Artificial Intelligence and Data Science', 'Dr. Ananya Sharma', 'Block A', 1800000.0),
        (3, 'Information Technology', 'Dr. Senthil Nathan', 'Block B', 1200000.0),
        (4, 'Electronics and Communication', 'Dr. Radhika Menon', 'Block C', 1400000.0),
        (5, 'Mechanical Engineering', 'Dr. Rajesh Patel', 'Block D', 1100000.0)
    ]
    cursor.executemany("INSERT INTO departments VALUES (?, ?, ?, ?, ?)", departments)

    # Seed Students (top records specifically match PPT: Arun, Divya, Karthik, Meena, Rohit)
    students = [
        (101, 'Arun', 1, 9.85, 4, 'Male', 'arun@college.edu', '9876543210', 'Chennai'),
        (102, 'Divya', 2, 9.62, 3, 'Female', 'divya@college.edu', '9876543211', 'Coimbatore'),
        (103, 'Karthik', 1, 9.41, 4, 'Male', 'karthik@college.edu', '9876543212', 'Bangalore'),
        (104, 'Meena', 2, 9.32, 2, 'Female', 'meena@college.edu', '9876543213', 'Madurai'),
        (105, 'Rohit', 3, 9.21, 3, 'Male', 'rohit@college.edu', '9876543214', 'Hyderabad'),
        (106, 'Priya', 4, 9.15, 4, 'Female', 'priya@college.edu', '9876543215', 'Chennai'),
        (107, 'Sanjay', 2, 8.95, 2, 'Male', 'sanjay@college.edu', '9876543216', 'Coimbatore'),
        (108, 'Ananya', 1, 8.88, 3, 'Female', 'ananya@college.edu', '9876543217', 'Bangalore'),
        (109, 'Vignesh', 5, 8.75, 4, 'Male', 'vignesh@college.edu', '9876543218', 'Salem'),
        (110, 'Sneha', 3, 8.65, 2, 'Female', 'sneha@college.edu', '9876543219', 'Tiruchirappalli'),
        (111, 'Rahul', 4, 8.45, 1, 'Male', 'rahul@college.edu', '9876543220', 'Madurai'),
        (112, 'Harini', 2, 8.30, 1, 'Female', 'harini@college.edu', '9876543221', 'Chennai'),
        (113, 'Deepak', 5, 7.80, 2, 'Male', 'deepak@college.edu', '9876543222', 'Coimbatore'),
        (114, 'Kavya', 3, 7.65, 1, 'Female', 'kavya@college.edu', '9876543223', 'Hyderabad'),
        (115, 'Manoj', 1, 7.40, 3, 'Male', 'manoj@college.edu', '9876543224', 'Salem'),
        (116, 'Swetha', 4, 7.20, 2, 'Female', 'swetha@college.edu', '9876543225', 'Chennai'),
        (117, 'Naveen', 5, 6.90, 4, 'Male', 'naveen@college.edu', '9876543226', 'Erode'),
        (118, 'Pooja', 2, 8.10, 3, 'Female', 'pooja@college.edu', '9876543227', 'Bangalore'),
        (119, 'Suresh', 3, 6.85, 2, 'Male', 'suresh@college.edu', '9876543228', 'Tiruppur'),
        (120, 'Nithya', 1, 9.05, 4, 'Female', 'nithya@college.edu', '9876543229', 'Coimbatore')
    ]
    cursor.executemany("INSERT INTO students VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", students)

    # Seed Courses
    courses = [
        ('CS101', 'Data Structures and Algorithms', 1, 4, 3),
        ('CS102', 'Database Management Systems', 1, 4, 4),
        ('AI201', 'Machine Learning Foundations', 2, 4, 5),
        ('AI202', 'Natural Language Processing', 2, 3, 6),
        ('IT301', 'Cloud Computing & DevOps', 3, 3, 5),
        ('EC401', 'Digital Signal Processing', 4, 4, 4),
        ('ME501', 'Thermodynamics & Heat Transfer', 5, 4, 3)
    ]
    cursor.executemany("INSERT INTO courses VALUES (?, ?, ?, ?, ?)", courses)

    # Seed Faculty
    faculty = [
        (1, 'Dr. Ramesh Kumar', 1, 'Professor & HOD', 140000.0, 18),
        (2, 'Dr. Ananya Sharma', 2, 'Associate Professor & HOD', 135000.0, 14),
        (3, 'Dr. Senthil Nathan', 3, 'Professor & HOD', 130000.0, 16),
        (4, 'Dr. Radhika Menon', 4, 'Professor & HOD', 125000.0, 15),
        (5, 'Dr. Rajesh Patel', 5, 'Professor & HOD', 120000.0, 12),
        (6, 'Dr. Malathi Sundaram', 1, 'Assistant Professor', 85000.0, 6),
        (7, 'Dr. Vikram Reddy', 2, 'Assistant Professor', 90000.0, 7),
        (8, 'Dr. Kavitha Chandran', 3, 'Assistant Professor', 82000.0, 5)
    ]
    cursor.executemany("INSERT INTO faculty VALUES (?, ?, ?, ?, ?, ?)", faculty)

    # Seed Enrollments
    for s_id, _, dept_id, cgpa, _, _, _, _, _ in students:
        c_list = ['CS101', 'CS102'] if dept_id == 1 else (['AI201', 'AI202'] if dept_id == 2 else ['IT301', 'CS102'])
        for c_id in c_list:
            if cgpa >= 9.0:
                grade, marks = ('O', 96) if random.random() > 0.3 else ('A+', 89)
            elif cgpa >= 8.0:
                grade, marks = ('A+', 88) if random.random() > 0.5 else ('A', 82)
            else:
                grade, marks = ('B+', 76) if random.random() > 0.4 else ('B', 68)
            cursor.execute("INSERT INTO enrollments (student_id, course_id, semester, grade, marks) VALUES (?, ?, ?, ?, ?)",
                           (s_id, c_id, 4, grade, marks))

    # Seed Attendance (ensure some students < 75% for querying low attendance)
    for s_id, _, _, cgpa, _, _, _, _, _ in students:
        total = 60
        if s_id in [117, 119, 115]:
            attended = random.randint(35, 43)  # < 75%
        else:
            attended = random.randint(46, 59)  # >= 75%
        pct = round((attended / total) * 100, 2)
        cursor.execute("INSERT INTO attendance (student_id, course_id, total_classes, attended_classes, attendance_percentage) VALUES (?, ?, ?, ?, ?)",
                       (s_id, 'CS102', total, attended, pct))

    conn.commit()
    conn.close()
    print(f"Created {db_path}")

def init_ecommerce_db():
    db_path = os.path.join(BASE_DIR, "ecommerce_store.db")
    if os.path.exists(db_path):
        os.remove(db_path)
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE categories (
        category_id INTEGER PRIMARY KEY,
        category_name TEXT NOT NULL,
        description TEXT
    );
    """)

    cursor.execute("""
    CREATE TABLE products (
        product_id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        category_id INTEGER NOT NULL,
        price REAL NOT NULL,
        stock_quantity INTEGER NOT NULL,
        rating REAL NOT NULL,
        FOREIGN KEY (category_id) REFERENCES categories(category_id)
    );
    """)

    cursor.execute("""
    CREATE TABLE customers (
        customer_id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        city TEXT NOT NULL,
        membership_tier TEXT NOT NULL,
        join_date TEXT NOT NULL
    );
    """)

    cursor.execute("""
    CREATE TABLE orders (
        order_id INTEGER PRIMARY KEY,
        customer_id INTEGER NOT NULL,
        order_date TEXT NOT NULL,
        total_amount REAL NOT NULL,
        status TEXT NOT NULL,
        payment_method TEXT NOT NULL,
        FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
    );
    """)

    cursor.execute("""
    CREATE TABLE order_items (
        item_id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        unit_price REAL NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(order_id),
        FOREIGN KEY (product_id) REFERENCES products(product_id)
    );
    """)

    categories = [
        (1, 'Laptops & Computers', 'High performance laptops, desktops, and accessories'),
        (2, 'Smartphones & Tablets', 'Latest 5G smartphones and tablets'),
        (3, 'Audio & Wearables', 'Noise cancelling headphones, smartwatches, and speakers'),
        (4, 'Smart Home', 'IoT devices, security cameras, smart lights')
    ]
    cursor.executemany("INSERT INTO categories VALUES (?, ?, ?)", categories)

    products = [
        (1, 'MacBook Pro M3', 1, 1999.99, 45, 4.9),
        (2, 'Dell XPS 15', 1, 1499.99, 30, 4.7),
        (3, 'ThinkPad X1 Carbon', 1, 1349.50, 25, 4.6),
        (4, 'iPhone 16 Pro', 2, 1199.00, 80, 4.8),
        (5, 'Samsung Galaxy S24 Ultra', 2, 1299.99, 65, 4.8),
        (6, 'Google Pixel 9', 2, 799.00, 50, 4.5),
        (7, 'Sony WH-1000XM5', 3, 399.99, 120, 4.8),
        (8, 'Apple AirPods Pro 2', 3, 249.00, 150, 4.7),
        (9, 'Apple Watch Series 10', 3, 429.00, 75, 4.6),
        (10, 'Nest Smart Thermostat', 4, 129.99, 90, 4.4)
    ]
    cursor.executemany("INSERT INTO products VALUES (?, ?, ?, ?, ?, ?)", products)

    customers = [
        (1, 'Alice Johnson', 'alice@gmail.com', 'New York', 'Platinum', '2023-01-15'),
        (2, 'Bob Smith', 'bob@yahoo.com', 'San Francisco', 'Gold', '2023-03-22'),
        (3, 'Charlie Brown', 'charlie@outlook.com', 'Chicago', 'Silver', '2023-06-10'),
        (4, 'Diana Prince', 'diana@gmail.com', 'Seattle', 'Platinum', '2023-08-05'),
        (5, 'Evan Wright', 'evan@gmail.com', 'Austin', 'Bronze', '2024-01-12'),
        (6, 'Fiona Gallagher', 'fiona@gmail.com', 'Boston', 'Gold', '2024-02-18')
    ]
    cursor.executemany("INSERT INTO customers VALUES (?, ?, ?, ?, ?, ?)", customers)

    orders = [
        (1001, 1, '2024-05-01', 2399.98, 'Completed', 'Credit Card'),
        (1002, 2, '2024-05-03', 1299.99, 'Completed', 'PayPal'),
        (1003, 3, '2024-05-10', 399.99, 'Completed', 'Credit Card'),
        (1004, 4, '2024-05-12', 3198.99, 'Shipped', 'Credit Card'),
        (1005, 5, '2024-05-15', 799.00, 'Processing', 'Debit Card'),
        (1006, 1, '2024-05-20', 429.00, 'Completed', 'Apple Pay'),
        (1007, 6, '2024-05-22', 1499.99, 'Completed', 'Credit Card')
    ]
    cursor.executemany("INSERT INTO orders VALUES (?, ?, ?, ?, ?, ?)", orders)

    order_items = [
        (1, 1001, 1, 1, 1999.99),
        (2, 1001, 7, 1, 399.99),
        (3, 1002, 5, 1, 1299.99),
        (4, 1003, 7, 1, 399.99),
        (5, 1004, 1, 1, 1999.99),
        (6, 1004, 4, 1, 1199.00),
        (7, 1005, 6, 1, 799.00),
        (8, 1006, 9, 1, 429.00),
        (9, 1007, 2, 1, 1499.99)
    ]
    cursor.executemany("INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)",
                       [(o, p, q, u) for _, o, p, q, u in order_items])

    conn.commit()
    conn.close()
    print(f"Created {db_path}")

def init_healthcare_db():
    db_path = os.path.join(BASE_DIR, "healthcare.db")
    if os.path.exists(db_path):
        os.remove(db_path)
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE departments (
        dept_id INTEGER PRIMARY KEY,
        dept_name TEXT NOT NULL,
        floor INTEGER NOT NULL
    );
    """)

    cursor.execute("""
    CREATE TABLE doctors (
        doctor_id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        dept_id INTEGER NOT NULL,
        specialization TEXT NOT NULL,
        consultation_fee REAL NOT NULL,
        experience_years INTEGER NOT NULL,
        FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
    );
    """)

    cursor.execute("""
    CREATE TABLE patients (
        patient_id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        age INTEGER NOT NULL,
        gender TEXT NOT NULL,
        blood_group TEXT NOT NULL,
        city TEXT NOT NULL,
        admission_status TEXT NOT NULL
    );
    """)

    cursor.execute("""
    CREATE TABLE appointments (
        appointment_id INTEGER PRIMARY KEY,
        patient_id INTEGER NOT NULL,
        doctor_id INTEGER NOT NULL,
        appointment_date TEXT NOT NULL,
        diagnosis TEXT NOT NULL,
        status TEXT NOT NULL,
        FOREIGN KEY (patient_id) REFERENCES patients(patient_id),
        FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id)
    );
    """)

    cursor.execute("""
    CREATE TABLE billings (
        bill_id INTEGER PRIMARY KEY,
        appointment_id INTEGER NOT NULL,
        amount REAL NOT NULL,
        insurance_covered REAL NOT NULL,
        payment_status TEXT NOT NULL,
        FOREIGN KEY (appointment_id) REFERENCES appointments(appointment_id)
    );
    """)

    departments = [
        (1, 'Cardiology', 3),
        (2, 'Neurology', 4),
        (3, 'Orthopedics', 2),
        (4, 'Pediatrics', 1),
        (5, 'General Medicine', 1)
    ]
    cursor.executemany("INSERT INTO departments VALUES (?, ?, ?)", departments)

    doctors = [
        (1, 'Dr. Robert Chen', 1, 'Interventional Cardiologist', 150.0, 15),
        (2, 'Dr. Sarah Jenkins', 2, 'Neurologist', 180.0, 12),
        (3, 'Dr. Marcus Vance', 3, 'Orthopedic Surgeon', 160.0, 20),
        (4, 'Dr. Emily Watson', 4, 'Pediatrician', 100.0, 8),
        (5, 'Dr. Alan Shore', 5, 'General Physician', 80.0, 10)
    ]
    cursor.executemany("INSERT INTO doctors VALUES (?, ?, ?, ?, ?, ?)", doctors)

    patients = [
        (1, 'John Doe', 45, 'Male', 'O+', 'San Jose', 'Outpatient'),
        (2, 'Jane Doe', 34, 'Female', 'A+', 'San Francisco', 'Inpatient'),
        (3, 'Michael Scott', 52, 'Male', 'B+', 'Scranton', 'Outpatient'),
        (4, 'Pam Beesly', 29, 'Female', 'O-', 'Scranton', 'Outpatient'),
        (5, 'Jim Halpert', 32, 'Male', 'AB+', 'Philadelphia', 'Inpatient')
    ]
    cursor.executemany("INSERT INTO patients VALUES (?, ?, ?, ?, ?, ?, ?)", patients)

    appointments = [
        (1, 1, 1, '2024-05-10', 'Hypertension', 'Completed'),
        (2, 2, 2, '2024-05-11', 'Migraine', 'Completed'),
        (3, 3, 3, '2024-05-12', 'Knee Sprain', 'Completed'),
        (4, 4, 4, '2024-05-15', 'Routine Checkup', 'Completed'),
        (5, 5, 5, '2024-05-18', 'Viral Fever', 'Completed')
    ]
    cursor.executemany("INSERT INTO appointments VALUES (?, ?, ?, ?, ?, ?)", appointments)

    billings = [
        (1, 1, 1200.0, 900.0, 'Paid'),
        (2, 2, 2400.0, 1800.0, 'Paid'),
        (3, 3, 1500.0, 1000.0, 'Pending'),
        (4, 4, 300.0, 250.0, 'Paid'),
        (5, 5, 450.0, 350.0, 'Paid')
    ]
    cursor.executemany("INSERT INTO billings VALUES (?, ?, ?, ?, ?)", billings)

    conn.commit()
    conn.close()
    print(f"Created {db_path}")

def init_all():
    os.makedirs(BASE_DIR, exist_ok=True)
    init_college_db()
    init_ecommerce_db()
    init_healthcare_db()

if __name__ == "__main__":
    init_all()
