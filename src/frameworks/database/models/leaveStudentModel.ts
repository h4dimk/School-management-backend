import mongoose, { Model, Schema } from "mongoose";

import { ILeaveStudent } from "../../../entities/leaveStudentEntity";
import Leave from "../../../@types/enum/leave";

const leaveSchema: Schema<ILeaveStudent> = new Schema(
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
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    studentBatch: {
      type: String,
    },
    status: {
      type: String,
      default: Leave.PENDING,
    },
  },
  { timestamps: true }
);

const leaveModel: Model<ILeaveStudent> = mongoose.model(
  "LeaveStudent",
  leaveSchema
);
export default leaveModel;
