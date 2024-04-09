import { Types } from "mongoose";
import Leave from "../@types/enum/leave";

export interface ILeaveTeacher {
  _id?: string;
  leaveType: string;
  startDate: Date;
  endDate: Date;
  reason: string;
  teacher: Types.ObjectId | string;
  status?: Leave;
}
