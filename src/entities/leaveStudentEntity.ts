import { Types } from "mongoose";

export interface ILeaveStudent {
  _id?: string;
  leaveType: string;
  startDate: Date;
  endDate: Date;
  reason: string;
  student: Types.ObjectId | string;
}
