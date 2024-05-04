import { IAnnouncement } from "../../../entities/announcementEntity";
import { IAssignment } from "../../../entities/assignmentEntity";
import { IMessage } from "../../../entities/chatEntity";
import { ILeaveStudent } from "../../../entities/leaveStudentEntity";
import { IMcq } from "../../../entities/mcqEntity";
import { IMcqSubmission } from "../../../entities/mcqSubmits";
import { IRemark } from "../../../entities/remarksEntity";
import { IStudent } from "../../../entities/studentEntity";
import { ITimetable } from "../../../entities/timeTableEntity";
import { Next } from "../../../frameworks/types/serverPackageTypes";

export interface IStudentUseCase {
  login(
    email: string,
    password: string,
    next: Next
  ): Promise<{ student: IStudent; token: string } | void>;

  getAnnouncements(next: Next): Promise<IAnnouncement[]>;
  getLeaves(studentId: string): Promise<ILeaveStudent[]>;
  getChats(batchId: string): Promise<IMessage[]>;
  getTimetables(batch: string, next: Next): Promise<ITimetable[]>;

  findMcqsByBatch(
    batchId: string,
    studentId: string,
    next: Next
  ): Promise<IMcq[]>;
  getAnsweredMcqs(studentId: string, next: Next): Promise<IMcqSubmission[]>;

  getStudentProfile(studentId: string): Promise<IStudent | null>;
  getAttendance(studentId: string): Promise<any>;

  updateStudentProfile(
    studentId: string,
    updates: Partial<IStudent>
  ): Promise<IStudent>;

  applyLeave(
    leaveData: ILeaveStudent,
    next: Next
  ): Promise<ILeaveStudent | undefined>;
  submitAnswer(answer: IMcqSubmission, next: Next): Promise<void>;

  cancelLeave(leaveId: string): Promise<void>;
  addMessage(messageData: IMessage): Promise<IMessage>;
  addAssignment(assignment: IAssignment, next: Next): Promise<void>;
  getAssignments(studentId: string, next: Next): Promise<IAssignment[]>;
  getRemarks(batchId: string): Promise<IRemark[]>
}
