import adminModel from "../models/adminModel";

import { IAdminRepository } from "../../../useCases/interface/repository/adminRepository";
import { IAdmin } from "../../../entities/adminEntity";
import { ITeacher } from "../../../entities/teacherEntity";
import { IStudent } from "../../../entities/studentEntity";

import {
  findByEmail,
  createTeacher,
  findTeacher,
  getTeachers,
  blockTeacher,
  removeTeacher,
  createStudent,
  findStudent,
  getStudents,
  blockStudent,
  removeStudent,
  createCourse,
  findCourse,
  getCourses,
  removeCourse,
  getAdminById,
  updateAdmin,
  addBatch,
  getBatches,
  removeBatch,
  addStudentBatch,
  addAnnouncement,
  removeAnnouncement,
  getAnnouncements,
  findTeachersLeaves,
  updateTeachersLeaveStatus,
  updateStudentsLeaveStatus,
  findStudentsLeaves,
  createGroup,
  createTimetable,
  deleteTimetable,
  findTimetables,
} from "./adminRepository/index";
import { ICourse } from "../../../entities/courseEntity";
import { IBatch } from "../../../entities/batchEntity";
import { IAnnouncement } from "../../../entities/announcementEntity";
import { Types } from "mongoose";
import Leave from "../../../@types/enum/leave";
import { ILeaveTeacher } from "../../../entities/leaveTeacherEntity";
import { ILeaveStudent } from "../../../entities/leaveStudentEntity";
import { IGroup } from "../../../entities/groupEntity";
import { ITimetable } from "../../../entities/timeTableEntity";

export class AdminRepository implements IAdminRepository {
  constructor(private adminModels: typeof adminModel) {}

  async findByEmail(email: string): Promise<IAdmin | null> {
    try {
      const adminExist = await findByEmail(email);
      return adminExist;
    } catch (error) {
      console.error("Error occurred while logging in admin:", error);
      throw new Error("Failed to log in admin");
    }
  }

  async createTeacher(teacher: ITeacher): Promise<void> {
    try {
      await createTeacher(teacher);
    } catch (error) {
      console.error("Error creating teacher:", error);
      throw new Error("Failed to create teacher");
    }
  }

  async findTeacher(email: string): Promise<ITeacher | null> {
    try {
      const teacherExist = await findTeacher(email);
      return teacherExist;
    } catch (error) {
      console.error("Error finding teacher by email:", error);
      throw new Error("Failed to find teacher by email");
    }
  }

  async getTeachers(): Promise<ITeacher[]> {
    try {
      const teachers = await getTeachers();
      return teachers;
    } catch (error) {
      throw new Error("Failed to fetch teachers");
    }
  }

  async blockTeacher(teacherId: string): Promise<boolean> {
    try {
      const isActive = await blockTeacher(teacherId);
      return isActive;
    } catch (error) {
      console.error("Error blocking/unblocking teacher:", error);
      throw new Error("Failed to block/unblock teacher");
    }
  }

  async removeTeacher(teacherId: string): Promise<void> {
    try {
      await removeTeacher(teacherId);
    } catch (error) {
      console.error("Error removing teacher:", error);
      throw new Error("Failed to remove teacher");
    }
  }

  async createStudent(student: IStudent): Promise<IStudent> {
    try {
      return await createStudent(student);
    } catch (error) {
      console.error("Error creating student:", error);
      throw new Error("Failed to create student");
    }
  }

  async findStudent(email: string): Promise<IStudent | null> {
    try {
      const studentExist = await findStudent(email);
      return studentExist;
    } catch (error) {
      console.error("Error finding student by email:", error);
      throw new Error("Failed to find student by email");
    }
  }

  async getStudents(): Promise<IStudent[]> {
    try {
      const students = await getStudents();
      return students;
    } catch (error) {
      throw new Error("Failed to fetch students");
    }
  }

  async blockStudent(studentId: string): Promise<boolean> {
    try {
      const isActive = await blockStudent(studentId);
      return isActive;
    } catch (error) {
      console.error("Error blocking/unblocking student:", error);
      throw new Error("Failed to block/unblock student");
    }
  }

  async removeStudent(studentId: string): Promise<void> {
    try {
      await removeStudent(studentId);
    } catch (error) {
      console.error("Error removing student:", error);
      throw new Error("Failed to remove student");
    }
  }

  async createCourse(course: ICourse): Promise<void> {
    try {
      await createCourse(course);
    } catch (error) {
      console.error("Error creating course:", error);
      throw new Error("Failed to create course");
    }
  }

  async findCourse(name: string): Promise<ICourse | null> {
    try {
      const courseExist = await findCourse(name);
      return courseExist;
    } catch (error) {
      console.error("Error finding course by name:", error);
      throw new Error("Failed to find course by name");
    }
  }

  async getCourse(): Promise<ICourse[]> {
    try {
      const courses = await getCourses();
      return courses;
    } catch (error) {
      throw new Error("Failed to fetch courses");
    }
  }

  async removeCourse(courseId: string): Promise<void> {
    try {
      await removeCourse(courseId);
    } catch (error) {
      console.error("Error removing course:", error);
      throw new Error("Failed to remove course");
    }
  }

  async getAdminById(adminId: string): Promise<IAdmin | null> {
    try {
      if (!adminId) {
        throw new Error("Admin ID is required");
      }

      const admin = await getAdminById(adminId);

      return admin;
    } catch (error) {
      throw new Error("Failed to fetch admin");
    }
  }
  async updateAdmin(adminId: string, admin: Partial<IAdmin>): Promise<IAdmin> {
    try {
      if (!adminId) {
        throw new Error("Admin ID is required");
      }
      const updatedAdmin = await updateAdmin(adminId, admin);
      return updatedAdmin;
    } catch (error) {
      throw new Error("Failed to update admin");
    }
  }

  async addBatch(batch: IBatch): Promise<void> {
    try {
      await addBatch(batch);
    } catch (error) {
      console.error("Error occurred while adding batch:", error); // Log the error
      throw new Error("Failed to add batch.");
    }
  }

  async getBatches(): Promise<IBatch[]> {
    try {
      const batches = await getBatches();
      return batches;
    } catch (error) {
      throw new Error("Failed to fetch batches");
    }
  }

  async removeBatch(batchId: string): Promise<void> {
    try {
      await removeBatch(batchId);
    } catch (error) {
      console.error("Error removing batch:", error);
      throw new Error("Failed to remove batch");
    }
  }

  async updateBatch(
    batchId: Types.ObjectId,
    studentId: string
  ): Promise<IBatch | null> {
    try {
      const batch = await addStudentBatch(batchId, studentId);

      if (!batch) {
        throw new Error("Batch not found");
      }

      return batch;
    } catch (error) {
      console.error("Error updating batch:", error);
      throw new Error("Failed to updating batch");
    }
  }

  async addAnnouncement(announcementData: IAnnouncement): Promise<void> {
    try {
      await addAnnouncement(announcementData);
    } catch (error) {
      console.error("Error occurred while adding announcement:", error);
      throw new Error("Failed to add announcement.");
    }
  }

  async removeAnnouncement(announcementId: string): Promise<void> {
    try {
      await removeAnnouncement(announcementId);
    } catch (error) {
      console.error("Error removing announcement:", error);
      throw new Error("Failed to remove announcement");
    }
  }

  async getAnnouncements(): Promise<IAnnouncement[]> {
    try {
      const announcements = await getAnnouncements();
      return announcements;
    } catch (error) {
      throw new Error("Failed to fetch announcements");
    }
  }

  async getTeachersLeaves(): Promise<ILeaveTeacher[]> {
    try {
      const leaves = await findTeachersLeaves();
      return leaves;
    } catch (error) {
      console.error("Error fetching leave:", error);
      throw new Error("Failed to fetch leave. Please try again later.");
    }
  }

  async getStudentsLeaves(): Promise<ILeaveStudent[]> {
    try {
      const leaves = await findStudentsLeaves();
      return leaves;
    } catch (error) {
      console.error("Error fetching leave:", error);
      throw new Error("Failed to fetch leave. Please try again later.");
    }
  }

  async updateTeachersLeaveStatus(
    leaveId: string,
    status: Leave
  ): Promise<void> {
    try {
      await updateTeachersLeaveStatus(leaveId, status);
    } catch (error) {
      console.error("Error updating leave:", error);
      throw new Error("Failed to update leave. Please try again later.");
    }
  }

  async updateStudentsLeaveStatus(
    leaveId: string,
    status: Leave
  ): Promise<void> {
    try {
      await updateStudentsLeaveStatus(leaveId, status);
    } catch (error) {
      console.error("Error updating leave:", error);
      throw new Error("Failed to update leave. Please try again later.");
    }
  }

  async createGroup(groupData: IGroup): Promise<void> {
    try {
      await createGroup(groupData);
    } catch (error) {
      console.error("Error creating Group:", error);
      throw new Error("Failed to create Group");
    }
  }

  async createTimetable(timetable: ITimetable): Promise<void> {
    try {
      const createdtimetable = await createTimetable(timetable);
    } catch (error) {
      console.error("Error creating timetable:", error);
      throw new Error("Failed to create timetable");
    }
  }

  async removeTimetable(timetableId: string): Promise<void> {
    try {
      await deleteTimetable(timetableId);
    } catch (error) {
      console.error("Error removing timetable:", error);
      throw new Error("Failed to remove timetable");
    }
  }

  async getTimetables(): Promise<ITimetable[]> {
    try {
      const timetables = await findTimetables();
      return timetables;
    } catch (error) {
      console.error("Error fetching timetables:", error);
      throw new Error("Failed to fetch timetables. Please try again later.");
    }
  }
}
