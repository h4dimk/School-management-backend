import mongoose, { Schema, Model } from "mongoose";
import { IAttendence } from "../../../entities/attendenceEntity";

const attendanceSchema: Schema<IAttendence> = new Schema({
  batchId: { type: Schema.Types.ObjectId, ref: "batch", required: true },
  present: [{ type: Schema.Types.ObjectId, ref: "Student", required: true }],
  absent: [{ type: Schema.Types.ObjectId, ref: "Student", required: true }],
  date: { type: Date, default: Date.now },
});

const attendenceModel: Model<IAttendence> = mongoose.model(
  "Attendence",
  attendanceSchema
);

export default attendenceModel;
