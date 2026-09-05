CREATE TABLE IF NOT EXISTS public.patients (
    id TEXT PRIMARY KEY DEFAULT ('P' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 6))),
    name TEXT NOT NULL,
    age INTEGER NOT NULL CHECK (age >= 0 AND age <= 150),
    gender TEXT NOT NULL,
    contact TEXT NOT NULL,
    email TEXT,
    ward TEXT NOT NULL,
    admission_date DATE NOT NULL DEFAULT CURRENT_DATE,
    diagnosis TEXT NOT NULL,
    doctor TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Stable' CHECK (status IN ('Critical', 'Stable', 'Under Observation', 'Recovering')),
    blood_group TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated staff can view patients" ON public.patients;
CREATE POLICY "Authenticated staff can view patients"
ON public.patients FOR SELECT TO authenticated
USING (true);

DROP POLICY IF EXISTS "Authenticated staff can add patients" ON public.patients;
CREATE POLICY "Authenticated staff can add patients"
ON public.patients FOR INSERT TO authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated staff can update patients" ON public.patients;
CREATE POLICY "Authenticated staff can update patients"
ON public.patients FOR UPDATE TO authenticated
USING (true) WITH CHECK (true);

INSERT INTO public.patients
    (id, name, age, gender, contact, email, ward, admission_date, diagnosis, doctor, status, blood_group)
VALUES
    ('P001', 'Vansh Gupta', 45, 'Male', '+91 98765 43210', 'vansh.doe@email.com', 'ICU', '2025-11-01', 'Cardiac Arrest', 'Dr. Suman', 'Critical', 'O+'),
    ('P002', 'Jayansh Sharma', 32, 'Female', '+91 98765 43211', 'sarah.j@email.com', 'General', '2025-11-02', 'Viral Fever', 'Dr. Raj Patel', 'Stable', 'A+'),
    ('P003', 'Aarav Mehta', 58, 'Male', '+91 98765 43212', 'm.brown@email.com', 'Cardiac', '2025-11-01', 'Angina Pectoris', 'Dr. Emily Williams', 'Under Observation', 'B+'),
    ('P004', 'Emma Wilson', 28, 'Female', '+91 98765 43213', 'emma.w@email.com', 'Maternity', '2025-11-03', 'Prenatal Care', 'Dr. Maria Garcia', 'Stable', 'AB+'),
    ('P005', 'David Lee', 12, 'Male', '+91 98765 43214', 'david.l@email.com', 'Pediatric', '2025-11-02', 'Asthma', 'Dr. James Chen', 'Recovering', 'O-')
ON CONFLICT (id) DO NOTHING;