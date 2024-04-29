import { Types } from "mongoose";

export interface IGroup {
  _id?: string;
  batchId: Types.ObjectId;
  members: Types.ObjectId[];
}
