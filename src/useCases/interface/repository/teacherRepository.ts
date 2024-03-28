import { IAnnouncement } from "../../../entities/announcementEntity";
import { ITeacher } from "../../../entities/teacherEntity";

export interface ITeacherRepository {
  findByEmail(email: string): Promise<ITeacher | null>;

  getAnnouncements(): Promise<IAnnouncement[]>;

  getTeacherById(teacherId: string): Promise<ITeacher | null>;

  updateTeacher(
    teacherId: string,
    teacher: Partial<ITeacher>
  ): Promise<ITeacher>;
}
