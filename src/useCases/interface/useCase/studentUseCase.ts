import { IAnnouncement } from "../../../entities/announcementEntity";
import { ILeaveStudent } from "../../../entities/leaveStudentEntity";
import { IStudent } from "../../../entities/studentEntity";
import { Next } from "../../../frameworks/types/serverPackageTypes";

export interface IStudentUseCase {
  login(
    email: string,
    password: string,
    next: Next
  ): Promise<{ student: IStudent; token: string } | void>;

  getAnnouncements(next: Next): Promise<IAnnouncement[]>;
  getLeaves(studentId: string): Promise<ILeaveStudent[]>;

  getStudentProfile(studentId: string): Promise<IStudent | null>;

  updateStudentProfile(
    studentId: string,
    updates: Partial<IStudent>
  ): Promise<IStudent>;

  applyLeave(
    leaveData: ILeaveStudent,
    next: Next
  ): Promise<ILeaveStudent | undefined>;

  cancelLeave(leaveId: string): Promise<void>;
}
