import Leave from "../../../@types/enum/leave";
import { IAnnouncement } from "../../../entities/announcementEntity";
import { IAssignment } from "../../../entities/assignmentEntity";
import { IAttendence } from "../../../entities/attendenceEntity";
import { ILeaveStudent } from "../../../entities/leaveStudentEntity";
import { ILeaveTeacher } from "../../../entities/leaveTeacherEntity";
import { IMcq } from "../../../entities/mcqEntity";
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
  findAssignments(batchId: string): Promise<IAssignment[]>

  getTeacherById(teacherId: string): Promise<ITeacher | null>;

  updateTeacher(
    teacherId: string,
    teacher: Partial<ITeacher>
  ): Promise<ITeacher>;
  updateLeaveStatus(leaveId: string, status: Leave): Promise<void>;

  createAttendence(attendence: IAttendence): Promise<IAttendence>;
  createLeave(leaveData: ILeaveTeacher): Promise<ILeaveTeacher>;
  createMcqs(mcqDetails: IMcq): Promise<IMcq>;

  removeLeave(leaveId: string): Promise<void>;
}
