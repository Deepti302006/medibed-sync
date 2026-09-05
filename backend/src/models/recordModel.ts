import mongoose, { Schema, Document } from "mongoose";

export interface IRecord extends Document {
  patient: mongoose.Types.ObjectId;
  doctor?: mongoose.Types.ObjectId;
  visitDate: Date;
  diagnosis?: string;
  prescription?: string;
  notes?: string;
  files?: string[]; // paths or URLs
}

const RecordSchema = new Schema<IRecord>({
  patient: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
  doctor: { type: Schema.Types.ObjectId, ref: "Staff" },
  visitDate: { type: Date, default: Date.now },
  diagnosis: { type: String },
  prescription: { type: String },
  notes: { type: String },
  files: [{ type: String }],
}, { timestamps: true });

export default mongoose.model<IRecord>("Record", RecordSchema);