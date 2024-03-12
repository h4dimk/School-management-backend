import mongoose, { Schema, Model } from "mongoose";

import { ITeacher } from "../../../entities/teacherEntity";

const teacherSchema: Schema<ITeacher> = new Schema(
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
    gender: {
      type: String,
    },
    password: {
      type: String,
      minlength: [6, "Password must be at least six characters"],
      select: false,
    },
    subject: {
      type: String,
      required: [true, "Please provide a valid subject"],
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
  },
  { timestamps: true }
);

const teacherModel: Model<ITeacher> = mongoose.model("Teacher", teacherSchema);
export default teacherModel;
