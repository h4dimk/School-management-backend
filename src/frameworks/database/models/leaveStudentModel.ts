import mongoose, { Model, Schema } from "mongoose";

import { ILeaveStudent } from "../../../entities/leaveStudentEntity";

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
  },
  { timestamps: true }
);

const leaveModel: Model<ILeaveStudent> = mongoose.model("LeaveStudent", leaveSchema);
export default leaveModel;
