import { IAnnouncement } from "../../../entities/announcementEntity";
import { IAttendence } from "../../../entities/attendenceEntity";
import { ITeacher } from "../../../entities/teacherEntity";
import { Next } from "../../../frameworks/types/serverPackageTypes";

export interface ITeacherUseCase {
  login(
    email: string,
    password: string,
    next: Next
  ): Promise<{ teacher: ITeacher; token: string } | void>;

  getAnnouncements(next: Next): Promise<IAnnouncement[]>;
  getAttendance(batchId: string, next: Next): Promise<IAttendence[]>;

  getTeacherProfile(teacherId: string): Promise<ITeacher | null>;

  updateTeacherProfile(
    teacherId: string,
    updates: Partial<ITeacher>
  ): Promise<ITeacher>;

  addAttendance(
    attendance: IAttendence,
    next: Next
  ): Promise<IAttendence | undefined>;
}
