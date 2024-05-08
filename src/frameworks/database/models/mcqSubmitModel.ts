import mongoose, { Model, Schema } from "mongoose";
import { IMcqSubmission } from "../../../entities/mcqSubmits";

const mcqSubmitSchema: Schema<IMcqSubmission> = new Schema(
  {
    mcqId: {
      type: Schema.Types.ObjectId,
      ref: "Mcq",
      required: true,
    },
    batchId: {
      type: Schema.Types.ObjectId,
      ref: "batch",
      required: true,
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const mcqSubmitModel: Model<IMcqSubmission> = mongoose.model(
  "Mcqsubmit",
  mcqSubmitSchema
);
export default mcqSubmitModel;
