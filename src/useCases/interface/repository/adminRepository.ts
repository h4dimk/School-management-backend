import { Types } from "mongoose";
import { IAdmin } from "../../../entities/adminEntity";
import { IAnnouncement } from "../../../entities/announcementEntity";
import { IBatch } from "../../../entities/batchEntity";
import { ICourse } from "../../../entities/courseEntity";
import { IStudent } from "../../../entities/studentEntity";
import { ITeacher } from "../../../entities/teacherEntity";

export interface IAdminRepository {
  createTeacher(teacher: ITeacher): Promise<void>;
  createStudent(student: IStudent): Promise<IStudent>;
  createCourse(course: ICourse): Promise<void>;

  addBatch(batch: IBatch): Promise<void>;
  addAnnouncement(announcementData: IAnnouncement): Promise<void>;

  findByEmail(email: string): Promise<IAdmin | null>;
  findTeacher(email: string): Promise<ITeacher | null>;
  findStudent(email: string): Promise<IStudent | null>;
  findCourse(name: string): Promise<ICourse | null>;

  getTeachers(): Promise<ITeacher[]>;
  getStudents(): Promise<IStudent[]>;
  getCourse(): Promise<ICourse[]>;
  getBatches(): Promise<IBatch[]>;
  getAnnouncements(): Promise<IAnnouncement[]>;

  blockTeacher(teacherId: string): Promise<boolean>;
  blockStudent(studentId: string): Promise<boolean>;

  removeTeacher(teacherId: string): Promise<void>;
  removeStudent(studentId: string): Promise<void>;
  removeCourse(courseId: string): Promise<void>;
  removeBatch(batchId: string): Promise<void>;
  removeAnnouncement(announcementId: string): Promise<void>;

  getAdminById(id: string): Promise<IAdmin | null>;

  updateAdmin(adminId: string, admin: Partial<IAdmin>): Promise<IAdmin>;
  updateBatch(
    batchId: Types.ObjectId,
    studentId: string
  ): Promise<IBatch | null>;
}
