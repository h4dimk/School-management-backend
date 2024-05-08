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

export interface ITeacherRepository {
  findByEmail(email: string): Promise<ITeacher | null>;

  getAnnouncements(): Promise<IAnnouncement[]>;
  getAttendance(batchId: string): Promise<IAttendence[]>;
  findLeaves(teacherId: string): Promise<ILeaveTeacher[]>;
  getStudentsLeaves(batch: string): Promise<ILeaveStudent[]>;
  getTimetables(teacherId: string): Promise<ITimetable[]>;
  getMcqsByBatch(batchId: string): Promise<IMcq[]>;
  getMcqsByTeacher(teacherId: string): Promise<IMcq[]>;
  findAssignments(batchId: string): Promise<IAssignment[]>;
  findChats(batchId: string): Promise<IMessage[]>;
  findRemarks(teacherId: string): Promise<IRemark[]>;
  findBatches(): Promise<IBatch[]>;
  findBatchRanks(batchId: string): Promise<IMcqSubmission[]>;

  getTeacherById(teacherId: string): Promise<ITeacher | null>;

  updateTeacher(
    teacherId: string,
    teacher: Partial<ITeacher>
  ): Promise<ITeacher>;
  updateLeaveStatus(leaveId: string, status: Leave): Promise<void>;

  createAttendence(attendence: IAttendence): Promise<IAttendence>;
  createLeave(leaveData: ILeaveTeacher): Promise<ILeaveTeacher>;
  createMcqs(mcqDetails: IMcq): Promise<IMcq>;
  createRemarks(remark: IRemark): Promise<IRemark>;

  addMessage(messageData: IMessage): Promise<IMessage>;

  removeLeave(leaveId: string): Promise<void>;
}
