import { Request, Response } from "express";
import Appointment from "../models/appointmentModel";

export const createAppointment = async (req: Request, res: Response) => {
  const { patient, doctor, date, reason } = req.body;
  const appt = await Appointment.create({ patient, doctor, date, reason });
  res.status(201).json(appt);
};

export const getAppointments = async (req: Request, res: Response) => {
  const list = await Appointment.find().populate("patient doctor");
  res.json(list);
};

export const getAppointment = async (req: Request, res: Response) => {
  const appt = await Appointment.findById(req.params.id).populate("patient doctor");
  if (!appt) return res.status(404).json({ message: "Not found" });
  res.json(appt);
};

export const updateAppointment = async (req: Request, res: Response) => {
  const appt = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(appt);
};

export const deleteAppointment = async (req: Request, res: Response) => {
  await Appointment.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};