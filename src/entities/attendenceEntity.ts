import { Types } from "mongoose";

export interface IAttendence {
  _id?: Types.ObjectId;
  batchId:Types.ObjectId;
  present: Types.ObjectId[];
  absent: Types.ObjectId[];
  date: Date;
}
