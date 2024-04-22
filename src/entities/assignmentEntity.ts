import { Types } from "mongoose";

export interface IAssignment {
  _id?: string;
  name: string;
  assignment: string;
  student: Types.ObjectId;
  batch: Types.ObjectId;
}
