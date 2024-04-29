import { Types } from "mongoose";

export interface IMessage {
  _id?: string;
  message: string;
  sender: Types.ObjectId;
  group: Types.ObjectId;
}
