import mongoose, { Model, Schema } from "mongoose";
import { IRemark } from "../../../entities/remarksEntity";

const remarkSchema: Schema<IRemark> = new Schema(
  {
    remark: {
      type: String,
      required: true,
    },
    teacherId: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    batchId: {
      type: Schema.Types.ObjectId,
      ref: "batch",
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    files: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const remarkModel: Model<IRemark> = mongoose.model("Remark", remarkSchema);
export default remarkModel;
