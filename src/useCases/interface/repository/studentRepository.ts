import { IAnnouncement } from "../../../entities/announcementEntity";
import { IAssignment } from "../../../entities/assignmentEntity";
import { IMessage } from "../../../entities/chatEntity";
import { ILeaveStudent } from "../../../entities/leaveStudentEntity";
import { IMcq } from "../../../entities/mcqEntity";
import { IMcqSubmission } from "../../../entities/mcqSubmits";
import { IStudent } from "../../../entities/studentEntity";
import { ITimetable } from "../../../entities/timeTableEntity";

export interface IStudentRepository {
  findByEmail(email: string): Promise<IStudent | null>;
  findLeaves(studentId: string): Promise<ILeaveStudent[]>;
  findChats(batchId: string): Promise<IMessage[]>;
  findAssignments(studentId: string): Promise<IAssignment[]>;

  getAnnouncements(): Promise<IAnnouncement[]>;
  getTimetables(batch: string): Promise<ITimetable[]>;
  getMcqsByBatch(batchId: string,studentId: string): Promise<IMcq[]>;

  getStudentById(studentId: string): Promise<IStudent | null>;

  updateStudent(
    studentId: string,
    student: Partial<IStudent>
  ): Promise<IStudent>;

  createLeave(leaveData: ILeaveStudent): Promise<ILeaveStudent>;
  createMcqSubmit(mcqSubmitDetails: IMcqSubmission): Promise<IMcqSubmission>;
  createAssignment(assignment: IAssignment): Promise<IAssignment>;

  addMessage(messageData: IMessage): Promise<IMessage>;

  removeLeave(leaveId: string): Promise<void>;
}
