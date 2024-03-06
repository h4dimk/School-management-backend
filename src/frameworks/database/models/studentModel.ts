import mongoose, { Schema, Model } from "mongoose";
import { IStudent } from "../../../entities/studentEntity";

const studentSchema: Schema<IStudent> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a valid name"],
      min: 3,
    },
    email: {
      type: String,
      required: [true, "Please provide a valid email"],
      unique: true,
    },
    password: {
      type: String,
      minlength: [6, "Password must be at least six characters"],
      select: false,
    },
    course: {
      type: String,
      required: [true, "Please provide a valid course"],
    },
    batch: {
      type: Schema.Types.Mixed,
      required: [true, "Please provide a valid batch"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    phonenumber: {
      type: Number,
    },
    profile: {
      type: String,
    },
  },
  { timestamps: true }
);

const studentModel: Model<IStudent> = mongoose.model("Student", studentSchema);
export default studentModel;
