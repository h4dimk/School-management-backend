import { IAnnouncement } from "../../../entities/announcementEntity";
import { IStudent } from "../../../entities/studentEntity";
import { Next } from "../../../frameworks/types/serverPackageTypes";

export interface IStudentUseCase {
  login(
    email: string,
    password: string,
    next: Next
  ): Promise<{ student: IStudent; token: string } | void>;

  getAnnouncements(next: Next): Promise<IAnnouncement[]>;

  getStudentProfile(studentId: string): Promise<IStudent | null>;

  updateStudentProfile(
    studentId: string,
    updates: Partial<IStudent>
  ): Promise<IStudent>;
}
