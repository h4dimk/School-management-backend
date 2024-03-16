import { ICourse } from "../../../entities/courseEntity";
import { IStudent } from "../../../entities/studentEntity";
import { ITeacher } from "../../../entities/teacherEntity";
import { Next } from "../../../frameworks/types/serverPackageTypes";
import { IAdmin } from "../../../entities/adminEntity";

export interface IAdminUseCase {
  login(
    email: string,
    password: string,
    next: Next
  ): Promise<{ admin: IAdmin ; token:string} | void>;

  addTeacher(teacher: ITeacher, next: Next): Promise<void>;
  addStudent(student: IStudent, next: Next): Promise<void>;
  addCourse(course: ICourse, next: Next): Promise<void>;

  getTeachers(next: Next): Promise<ITeacher[]>;
  getStudents(next: Next): Promise<IStudent[]>;
  getCourses(next: Next): Promise<ICourse[]>;

  blockTeacher(teacherId: string, next: Next): Promise<boolean>;
  blockStudent(studentId: string, next: Next): Promise<boolean>;

  removeTeacher(teacherId: string, next: Next): Promise<void>;
  removeStudent(studentId: string, next: Next): Promise<void>;
  removeCourse(courseId: string, next: Next): Promise<void>;

  getAdminProfile(adminId: string): Promise<IAdmin | null>;

  updateAdminProfile(adminId: string, updates: Partial<IAdmin>): Promise<IAdmin>;
}
