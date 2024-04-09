import { IAnnouncement } from "../../../entities/announcementEntity";
import { ILeaveStudent } from "../../../entities/leaveStudentEntity";
import { IStudent } from "../../../entities/studentEntity";

export interface IStudentRepository {
  findByEmail(email: string): Promise<IStudent | null>;
  findLeaves(studentId: string): Promise<ILeaveStudent[]>;

  getAnnouncements(): Promise<IAnnouncement[]>;

  getStudentById(studentId: string): Promise<IStudent | null>;

  updateStudent(
    studentId: string,
    student: Partial<IStudent>
  ): Promise<IStudent>;

  createLeave(leaveData: ILeaveStudent): Promise<ILeaveStudent>;

  removeLeave(leaveId: string): Promise<void>;
}
