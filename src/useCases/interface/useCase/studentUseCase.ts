import { IAnnouncement } from "../../../entities/announcementEntity";
import { IMessage } from "../../../entities/chatEntity";
import { ILeaveStudent } from "../../../entities/leaveStudentEntity";
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

  getStudentProfile(studentId: string): Promise<IStudent | null>;

  updateStudentProfile(
    studentId: string,
    updates: Partial<IStudent>
  ): Promise<IStudent>;

  applyLeave(
    leaveData: ILeaveStudent,
    next: Next
  ): Promise<ILeaveStudent | undefined>;

  cancelLeave(leaveId: string): Promise<void>;
  addMessage(messageData: IMessage): Promise<IMessage>;
}
