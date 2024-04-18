import mongoose, { Model, Schema, Types } from "mongoose";
import { ITimetable } from "../../../entities/timeTableEntity";

const timetableSchema: Schema<ITimetable> = new Schema({
  date: { type: Date, required: true },
  period: { type: Number, required: true },
  subject: { type: String, required: true },
  teacher: { type: Schema.Types.ObjectId, ref: "Teacher", required: true },
  batch: { type: Schema.Types.ObjectId, ref: "batch", required: true },
});

const timetableModel: Model<ITimetable> = mongoose.model(
  "Timetable",
  timetableSchema
);

export default timetableModel;
