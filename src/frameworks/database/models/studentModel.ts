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
    },
    gender: {
      type: String,
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
    role: {
      type: String,
    },
    avatar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    dob: {
      type: String || Date,
    },
  },
  { timestamps: true }
);

const studentModel: Model<IStudent> = mongoose.model("Student", studentSchema);
export default studentModel;
