import { Types } from "mongoose";

export interface IRemark {
    _id?: string;
    remark: string;
    teacherId: Types.ObjectId;
    batchId: Types.ObjectId;  
    subject: string;
    date: Date;
    files?: string[];  
  }