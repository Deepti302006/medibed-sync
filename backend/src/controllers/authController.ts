import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabase } from "../server";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

if (!JWT_SECRET) {
  console.error("Missing JWT_SECRET in .env");
  process.exit(1);
}

// POST /api/auth/create-admin
export const createAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as { email?: string; password?: string };
    if (!email || !password) return res.status(400).json({ error: "Email and password required." });

    // Check if admin exists
    const { data: existing, error: fetchErr } = await supabase
      .from("admins")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (fetchErr) return res.status(500).json({ error: fetchErr.message });
    if (existing) return res.status(409).json({ error: "Admin already exists." });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const { data, error } = await supabase
      .from("admins")
      .insert([{ email, password_hash: hash }])
      .select();

    if (error) return res.status(500).json({ error: error.message });

    res.status(201).json({ message: "Admin created", admin: { id: data?.[0]?.id, email } });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// POST /api/auth/login
export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as { email?: string; password?: string };
    if (!email || !password) return res.status(400).json({ error: "Email and password required." });

    const { data: admin, error } = await supabase
      .from("admins")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (error) return res.status(500).json({ error: error.message });
    if (!admin) return res.status(401).json({ error: "Invalid credentials." });

    const match = await bcrypt.compare(password, admin.password_hash);
    if (!match) return res.status(401).json({ error: "Invalid credentials." });

    const payload = { id: admin.id, email: admin.email, role: "admin" };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.json({ token, expiresIn: JWT_EXPIRES_IN, role: "admin" });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

// GET /api/auth/verify-admin  (protected)
export const verifyAdminToken = async (req: Request, res: Response) => {
  // authentication middleware attaches req.user
  const user = (req as any).user;
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  res.json({ ok: true, user });
};
