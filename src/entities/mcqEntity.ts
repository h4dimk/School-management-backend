import { Types } from "mongoose";

export interface IMcq {
  _id?: string;
  question: string;
  options: string[];
  correctAnswer: string;
  batchId: Types.ObjectId;
  teacherId:Types.ObjectId;
}
