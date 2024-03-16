import { ITeacher } from "../../../entities/teacherEntity";
import { Next } from "../../../frameworks/types/serverPackageTypes";

export interface ITeacherUseCase {
  login(
    email: string,
    password: string,
    next: Next
  ): Promise<{ teacher: ITeacher; token: string } | void>;

  getTeacherProfile(teacherId: string): Promise<ITeacher | null>;

  updateTeacherProfile(
    teacherId: string,
    updates: Partial<ITeacher>
  ): Promise<ITeacher>;
}
