import Leave from "../../../@types/enum/leave";
import { IAnnouncement } from "../../../entities/announcementEntity";
import { IAssignment } from "../../../entities/assignmentEntity";
import { IAttendence } from "../../../entities/attendenceEntity";
import { IBatch } from "../../../entities/batchEntity";
import { IMessage } from "../../../entities/chatEntity";
import { ILeaveStudent } from "../../../entities/leaveStudentEntity";
import { ILeaveTeacher } from "../../../entities/leaveTeacherEntity";
import { IMcq } from "../../../entities/mcqEntity";
import { IMcqSubmission } from "../../../entities/mcqSubmits";
import { IRemark } from "../../../entities/remarksEntity";
import { ITeacher } from "../../../entities/teacherEntity";
import { ITimetable } from "../../../entities/timeTableEntity";
import { Next } from "../../../frameworks/types/serverPackageTypes";

export interface ITeacherUseCase {
  login(
    email: string,
    password: string,
    next: Next
  ): Promise<{ teacher: ITeacher; token: string } | void>;

  getAnnouncements(next: Next): Promise<IAnnouncement[]>;
  getLeaves(studentId: string): Promise<ILeaveTeacher[]>;
  getAttendance(batchId: string, next: Next): Promise<IAttendence[]>;
  getStudentsLeaves(batch: string, next: Next): Promise<ILeaveStudent[]>;
  getTimetables(teacherId: string, next: Next): Promise<ITimetable[]>;
  findMcqsByTeacher(teacherId: string, next: Next): Promise<IMcq[]>;
  findMcqsByBatch(batchId: string, next: Next): Promise<IMcq[]>;
  getAssignments(batchId: string, next: Next): Promise<IAssignment[]>;
  getChats(batchId: string): Promise<IMessage[]>;
  getRemarks(teacherId: string): Promise<IRemark[]>;
  getBatches(): Promise<IBatch[]>;
  getBatchRanks(batchId: string, next: Next): Promise<IMcqSubmission[]>;

  getTeacherProfile(teacherId: string): Promise<ITeacher | null>;

  updateTeacherProfile(
    teacherId: string,
    updates: Partial<ITeacher>
  ): Promise<ITeacher>;
  updateLeaveStatus(leaveId: string, status: Leave, next: Next): Promise<void>;

  addAttendance(
    attendance: IAttendence,
    next: Next
  ): Promise<IAttendence | undefined>;
  addMcq(mcqDetails: IMcq, next: Next): Promise<void>;
  addMessage(messageData: IMessage): Promise<IMessage>;
  addRemarks(remarks: IRemark): Promise<IRemark>;

  applyLeave(
    leaveData: ILeaveTeacher,
    next: Next
  ): Promise<ILeaveTeacher | undefined>;

  cancelLeave(leaveId: string): Promise<void>;
}
