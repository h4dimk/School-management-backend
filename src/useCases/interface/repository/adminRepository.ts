import { IAdmin } from "../../../entities/adminEntity";
import { ICourse } from "../../../entities/courseEntity";
import { IStudent } from "../../../entities/studentEntity";
import { ITeacher } from "../../../entities/teacherEntity";

export interface IAdminRepository {
  createTeacher(teacher: ITeacher): Promise<void>;
  createStudent(student: IStudent): Promise<void>;
  createCourse(course: ICourse): Promise<void>;

  findByEmail(email: string): Promise<IAdmin | null>;
  findTeacher(email: string): Promise<ITeacher | null>;
  findStudent(email: string): Promise<IStudent | null>;
  findCourse(name: string): Promise<ICourse | null>;

  getTeachers(): Promise<ITeacher[]>;
  getStudents(): Promise<IStudent[]>;
  getCourse(): Promise<ICourse[]>;

  blockTeacher(teacherId: string): Promise<boolean>;
  blockStudent(studentId: string): Promise<boolean>;

  removeTeacher(teacherId: string): Promise<void>;
  removeStudent(studentId: string): Promise<void>;
  removeCourse(courseId: string): Promise<void>;

  getAdminById(id: string): Promise<IAdmin | null>;
  updateAdmin(adminId:string,admin: Partial<IAdmin>): Promise<IAdmin>;
}
