import { Request, Response } from "express";
import { supabase } from "../config/supabaseClient.js";

export const getAllStaff = async (req: Request, res: Response): Promise<void> => {
  const { data, error } = await supabase.from("staff").select("*");
  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }
  res.status(200).json(data);
};

export const addStaff = async (req: Request, res: Response): Promise<void> => {
  const { name, role, contact } = req.body;
  const { data, error } = await supabase
    .from("staff")
    .insert([{ name, role, contact }])
    .select();

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }
  res.status(201).json(data[0]);
};
