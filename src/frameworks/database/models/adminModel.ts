import mongoose, { Schema, Model } from "mongoose";

import { IAdmin } from "../../../entities/adminEntity";

const adminSchema: Schema<IAdmin> = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "please provide a valid email"],
      unique: true,
    },
    password: {
      type: String,
      minlength: [6, "password must be atleast six characters"],
    },
    phonenumber: {
      type: Number,
    },
    role: {
      type: String,
    },
    avatar: {
      type: String,
    },
    gender: {
      type: String,
    },
    dob: {
      type: String || Date,
    },
  },
  { timestamps: true }
);

const adminModel: Model<IAdmin> = mongoose.model("admin", adminSchema);
export default adminModel;
