import teacherModel from "../models/teacherModel";

import { ITeacherRepository } from "../../../useCases/interface/repository/teacherRepository";
import { ITeacher } from "../../../entities/teacherEntity";

import {
  findByEmail,
  getAnnouncements,
  getTeacherById,
  updateTeacher,
  createAttendence,
  getAttendance,
} from "./teacherRepository/index";
import { IAnnouncement } from "../../../entities/announcementEntity";
import { IAttendence } from "../../../entities/attendenceEntity";

export class TeacherRepository implements ITeacherRepository {
  constructor(private teacherModels: typeof teacherModel) {}

  async findByEmail(email: string): Promise<ITeacher | null> {
    try {
      const teacherExist = await findByEmail(email);
      return teacherExist;
    } catch (error) {
      console.error("Error occurred while logging in teacher:", error);
      throw new Error("Failed to log in teacher");
    }
  }

  async getTeacherById(teacherId: string): Promise<ITeacher | null> {
    try {
      if (!teacherId) {
        throw new Error("Teacher ID is required");
      }
      const teacher = await getTeacherById(teacherId);
      return teacher;
    } catch (error) {
      throw new Error("Failed to fetch teacher");
    }
  }

  async updateTeacher(
    teacherId: string,
    teacher: Partial<ITeacher>
  ): Promise<ITeacher> {
    try {
      if (!teacherId) {
        throw new Error("Student ID is required");
      }
      const updatedTeacher = await updateTeacher(teacherId, teacher);
      return updatedTeacher;
    } catch (error) {
      throw new Error("Failed to update teacher");
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

  async createAttendence(attendence: IAttendence): Promise<IAttendence> {
    try {
      const createdAttendence = await createAttendence(attendence);
      return createdAttendence;
    } catch (error) {
      console.error("Error occurred while creating attendence:", error);
      throw new Error("Failed to create attendence ");
    }
  }

  async getAttendance(batchId: string): Promise<IAttendence[]> {
    try {
      const attendance = await getAttendance(batchId);
      return attendance;
    } catch (error) {
      console.error("Error fetching attendance:", error);
      throw new Error("Failed to fetch attendance");
    }
  }
}
