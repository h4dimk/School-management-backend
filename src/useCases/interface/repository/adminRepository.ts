import { IAdmin } from "../../../entities/adminEntity";
import { IStudent } from "../../../entities/studentEntity";
import { ITeacher } from "../../../entities/teacherEntity";

export interface IAdminRepository {
  findByEmail(email: string): Promise<IAdmin | null>;
  create(admin: IAdmin): Promise<void>;
  createTeacher(teacher: ITeacher): Promise<void>;
  createStudent(student: IStudent): Promise<void>;
  findTeacher(email: string): Promise<ITeacher | null>;
  findStudent(email: string): Promise<IStudent | null>;
  getTeachers(): Promise<ITeacher[]>;
  getStudents(): Promise<IStudent[]>;
  blockTeacher(teacherId: string): Promise<boolean>;
  blockStudent(studentId: string): Promise<boolean>;
  removeTeacher(teacherId: string): Promise<void>;
  removeStudent(studentId: string): Promise<void>;
}
