import { Types } from "mongoose";
import Leave from "../@types/enum/leave";

export interface ILeaveStudent {
  _id?: string;
  leaveType: string;
  startDate: Date;
  endDate: Date;
  reason: string;
  student: Types.ObjectId | string;
  studentBatch: string;
  status?: Leave;
}
