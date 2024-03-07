import { ITeacher } from "../../../entities/teacherEntity";

export interface IAdminUseCase {
  login(email: string, password: string): Promise<string>;
  createAdmin(email: string, password: string): Promise<void>;
  addTeacher(teacher: ITeacher): Promise<void>;
  getTeachers(): Promise<ITeacher[]>;
  blockTeacher(teacherId: string): Promise<boolean>;
  removeTeacher(teacherId: string): Promise<void>;
}
