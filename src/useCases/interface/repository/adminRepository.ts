import { IAdmin } from "../../../entities/adminEntity";
import { ITeacher } from "../../../entities/teacherEntity";

export interface IAdminRepository {
  findByEmail(email: string): Promise<IAdmin | null>;
  create(admin: IAdmin): Promise<void>;
  createTeacher(teacher: ITeacher): Promise<void>;
  findTeacher(email: string): Promise<ITeacher | null>;
  getTeachers(): Promise<ITeacher[]>;
}
