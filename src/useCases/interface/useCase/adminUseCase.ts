import { ICourse } from "../../../entities/courseEntity";
import { IStudent } from "../../../entities/studentEntity";
import { ITeacher } from "../../../entities/teacherEntity";
import { Next } from "../../../frameworks/types/serverPackageTypes";
import { IAdmin } from "../../../entities/adminEntity";
import { IBatch } from "../../../entities/batchEntity";
import { IAnnouncement } from "../../../entities/announcementEntity";
import { ILeaveTeacher } from "../../../entities/leaveTeacherEntity";
import { ILeaveStudent } from "../../../entities/leaveStudentEntity";
import Leave from "../../../@types/enum/leave";

export interface IAdminUseCase {
  login(
    email: string,
    password: string,
    next: Next
  ): Promise<{ admin: IAdmin; token: string } | void>;

  addTeacher(teacher: ITeacher, next: Next): Promise<void>;
  addStudent(student: IStudent, next: Next): Promise<void>;
  addCourse(course: ICourse, next: Next): Promise<void>;
  addBatch(batch: IBatch, next: Next): Promise<void>;
  addAnnouncement(announcementData: IAnnouncement, next: Next): Promise<void>;

  getTeachers(next: Next): Promise<ITeacher[]>;
  getStudents(next: Next): Promise<IStudent[]>;
  getCourses(next: Next): Promise<ICourse[]>;
  getBatches(next: Next): Promise<IBatch[]>;
  getAnnouncements(next: Next): Promise<IAnnouncement[]>;
  getTeachersLeaves(next: Next): Promise<ILeaveTeacher[]>;
  getStudentsLeaves(next: Next): Promise<ILeaveStudent[]>;

  blockTeacher(teacherId: string, next: Next): Promise<boolean>;
  blockStudent(studentId: string, next: Next): Promise<boolean>;

  removeTeacher(teacherId: string, next: Next): Promise<void>;
  removeStudent(studentId: string, next: Next): Promise<void>;
  removeCourse(courseId: string, next: Next): Promise<void>;
  removeBatch(batchId: string, next: Next): Promise<void>;
  removeAnnouncemet(announcementId: string, next: Next): Promise<void>;

  getAdminProfile(adminId: string): Promise<IAdmin | null>;

  updateAdminProfile(
    adminId: string,
    updates: Partial<IAdmin>
  ): Promise<IAdmin>;
  updateTeacherLeaveStatus(
    leaveId: string,
    status: Leave,
    next: Next
  ): Promise<void>;
  updateStudentsLeaveStatus(
    leaveId: string,
    status: Leave,
    next: Next
  ): Promise<void>;
}
