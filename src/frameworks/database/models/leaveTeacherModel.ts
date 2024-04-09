import mongoose, { Model, Schema } from "mongoose";

import Leave from "../../../@types/enum/leave";
import { ILeaveTeacher } from "../../../entities/leaveTeacherEntity";

const leaveSchema: Schema<ILeaveTeacher> = new Schema(
  {
    leaveType: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    status: {
      type: String,
      default: Leave.PENDING,
    },
  },
  { timestamps: true }
);

const leaveModel: Model<ILeaveTeacher> = mongoose.model(
  "LeaveTeacher",
  leaveSchema
);
export default leaveModel;
