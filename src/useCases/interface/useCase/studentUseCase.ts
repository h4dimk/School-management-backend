import { IStudent } from "../../../entities/studentEntity";
import { Next } from "../../../frameworks/types/serverPackageTypes";

export interface IStudentUseCase {
  login(
    email: string,
    password: string,
    next: Next
  ): Promise<{ student: IStudent; token: string } | void>;

  getStudentProfile(studentId: string): Promise<IStudent | null>;

  updateStudentProfile(
    studentId: string,
    updates: Partial<IStudent>
  ): Promise<IStudent>;
}
