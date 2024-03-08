import { IStudent } from "../../../entities/studentEntity";
import { ITeacher } from "../../../entities/teacherEntity";

export interface IAdminUseCase {
  login(email: string, password: string): Promise<string>;
  createAdmin(email: string, password: string): Promise<void>;
  addTeacher(teacher: ITeacher): Promise<void>;
  addStudent(student: IStudent): Promise<void>;
  getTeachers(): Promise<ITeacher[]>;
  getStudents(): Promise<IStudent[]>;
  blockTeacher(teacherId: string): Promise<boolean>;
  blockStudent(studentId: string): Promise<boolean>;
  removeTeacher(teacherId: string): Promise<void>;
  removeStudent(studentId: string): Promise<void>;
}
