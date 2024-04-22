import mongoose, { Model, Schema } from "mongoose";
import { IAssignment } from "../../../entities/assignmentEntity";

const assignmentSchema: Schema<IAssignment> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    assignment: {
      type: String,
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    batch: {
      type: Schema.Types.ObjectId,
      ref: "batch",
      required: true,
    },
  },
  { timestamps: true }
);

const assignmentModel: Model<IAssignment> = mongoose.model(
  "Assignment",
  assignmentSchema
);
export default assignmentModel;
