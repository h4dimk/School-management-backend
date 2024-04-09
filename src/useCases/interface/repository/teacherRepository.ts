import { IAnnouncement } from "../../../entities/announcementEntity";
import { IAttendence } from "../../../entities/attendenceEntity";
import { ILeaveTeacher } from "../../../entities/leaveTeacherEntity";
import { ITeacher } from "../../../entities/teacherEntity";

export interface ITeacherRepository {
  findByEmail(email: string): Promise<ITeacher | null>;

  getAnnouncements(): Promise<IAnnouncement[]>;
  getAttendance(batchId: string): Promise<IAttendence[]>;
  findLeaves(teacherId: string): Promise<ILeaveTeacher[]>;

  getTeacherById(teacherId: string): Promise<ITeacher | null>;

  updateTeacher(
    teacherId: string,
    teacher: Partial<ITeacher>
  ): Promise<ITeacher>;

  createAttendence(attendence: IAttendence): Promise<IAttendence>;
  createLeave(leaveData: ILeaveTeacher): Promise<ILeaveTeacher>;
  removeLeave(leaveId: string): Promise<void>;
}
