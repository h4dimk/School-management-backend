import { Types } from "mongoose";
import Role from "../@types/enum/roles";

export interface IStudent {
  _id?: string;
  name: string;
  email: string;
  password: string;
  course: string;
  batch: string;
  gender: string;
  role: Role;
  isActive?: boolean;
  phonenumber?: number;
  avatar?: string;
  dob?: string | Date;
  batchId: Types.ObjectId;
}
