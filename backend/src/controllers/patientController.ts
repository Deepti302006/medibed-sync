import { Request, Response } from "express";
import { supabase } from "../config/supabaseClient.js";

export const getAllPatients = async (req: Request, res: Response): Promise<void> => {
  const { data, error } = await supabase.from("patients").select("*");
  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }
  res.status(200).json(data);
};

export const addPatient = async (req: Request, res: Response): Promise<void> => {
  const { name, age, condition } = req.body;
  const { data, error } = await supabase
    .from("patients")
    .insert([{ name, age, condition }])
    .select();

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }
  res.status(201).json(data[0]);
};
