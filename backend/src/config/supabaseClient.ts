import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error("Missing VITE_SUPABASE_URL or SUPABASE_URL in the environment.");
}

if (!serviceRoleKey) {
  throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY in backend/.env. Use the server-side key from Supabase Project Settings > API.");
}

export const supabase = createClient(
  supabaseUrl,
  serviceRoleKey
);

