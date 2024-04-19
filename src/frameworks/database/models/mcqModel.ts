import mongoose, { Model, Schema } from "mongoose";
import { IMcq } from "../../../entities/mcqEntity";

const mcqSchema: Schema<IMcq> = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      required: true,
    },
    correctAnswer: {
      type: String,
      required: true,
    },
    batchId: {
      type: Schema.Types.ObjectId,
      ref: "batch",
      required: true,
    },
    teacherId: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
  },
  { timestamps: true }
);

const mcqModel: Model<IMcq> = mongoose.model("Mcq", mcqSchema);
export default mcqModel;
