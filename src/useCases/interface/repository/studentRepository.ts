import { IAnnouncement } from "../../../entities/announcementEntity";
import { IStudent } from "../../../entities/studentEntity";

export interface IStudentRepository {
  findByEmail(email: string): Promise<IStudent | null>;

  getAnnouncements(): Promise<IAnnouncement[]>;

  getStudentById(studentId: string): Promise<IStudent | null>;

  updateStudent(
    studentId: string,
    student: Partial<IStudent>
  ): Promise<IStudent>;
}
