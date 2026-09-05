import mongoose, { Schema, Document } from "mongoose";

export interface IAppointment extends Document {
  patient: mongoose.Types.ObjectId;
  doctor?: mongoose.Types.ObjectId;
  date: Date;
  reason?: string;
  status: string;
}

const AppointmentSchema = new Schema<IAppointment>({
  patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
  doctor: { type: Schema.Types.ObjectId, ref: "Staff" },
  date: { type: Date, required: true },
  reason: { type: String },
  status: { type: String, enum: ["scheduled", "completed", "cancelled"], default: "scheduled" },
}, { timestamps: true });

export default mongoose.model<IAppointment>("Appointment", AppointmentSchema);