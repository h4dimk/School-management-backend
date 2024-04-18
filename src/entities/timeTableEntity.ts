import { Types } from "mongoose";

export interface ITimetable {
  _id?: string;
  date: Date;
  period: number;
  subject: string;
  teacher: Types.ObjectId;
  batch: Types.ObjectId;
}
