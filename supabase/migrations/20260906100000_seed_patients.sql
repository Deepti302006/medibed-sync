INSERT INTO public.patients
    (id, name, age, gender, contact, email, ward, admission_date, diagnosis, doctor, status, blood_group)
VALUES
    ('P001', 'Vansh Gupta', 45, 'Male', '+91 98765 43210', 'vansh.doe@email.com', 'ICU', '2025-11-01', 'Cardiac Arrest', 'Dr. Suman', 'Critical', 'O+'),
    ('P002', 'Jayansh Sharma', 32, 'Female', '+91 98765 43211', 'sarah.j@email.com', 'General', '2025-11-02', 'Viral Fever', 'Dr. Raj Patel', 'Stable', 'A+'),
    ('P003', 'Aarav Mehta', 58, 'Male', '+91 98765 43212', 'm.brown@email.com', 'Cardiac', '2025-11-01', 'Angina Pectoris', 'Dr. Emily Williams', 'Under Observation', 'B+'),
    ('P004', 'Emma Wilson', 28, 'Female', '+91 98765 43213', 'emma.w@email.com', 'Maternity', '2025-11-03', 'Prenatal Care', 'Dr. Maria Garcia', 'Stable', 'AB+'),
    ('P005', 'David Lee', 12, 'Male', '+91 98765 43214', 'david.l@email.com', 'Pediatric', '2025-11-02', 'Asthma', 'Dr. James Chen', 'Recovering', 'O-')
ON CONFLICT (id) DO NOTHING;