import { Request, Response } from "express";
import Record from "../models/recordModel";

export const createRecord = async (req: Request, res: Response) => {
  const rec = await Record.create(req.body);
  res.status(201).json(rec);
};

export const getRecordsByPatient = async (req: Request, res: Response) => {
  const records = await Record.find({ patient: req.params.patientId }).populate("doctor");
  res.json(records);
};

export const getRecord = async (req: Request, res: Response) => {
  const rec = await Record.findById(req.params.id).populate("doctor patient");
  if (!rec) return res.status(404).json({ message: "Not found" });
  res.json(rec);
};

export const updateRecord = async (req: Request, res: Response) => {
  const rec = await Record.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(rec);
};

export const deleteRecord = async (req: Request, res: Response) => {
  await Record.findByIdAndDelete(req.params.id);
  res.json({ 