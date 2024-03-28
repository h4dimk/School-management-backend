import { Types } from "mongoose";
import { IStudent } from "./studentEntity";

export interface IBatch {
  _id?: Types.ObjectId;
  name: string;
  students: Types.ObjectId[] | IStudent[];
}
