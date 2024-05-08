import { Types } from "mongoose";

export interface IMcqSubmission {
  _id?: string;
  mcqId: Types.ObjectId;
  studentId: Types.ObjectId;
  isCorrect: boolean;
  batchId:Types.ObjectId;
}
