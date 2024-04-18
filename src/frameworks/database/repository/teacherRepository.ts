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
  createLeave,
  findLeavebyTeacherId,
  removeLeave,
  findStudentsLeaves,
  updateLeaveStatus,
  createMessage,
  findChats,
  findTimetables,
} from "./teacherRepository/index";
import { IAnnouncement } from "../../../entities/announcementEntity";
import { IAttendence } from "../../../entities/attendenceEntity";
import { ILeaveTeacher } from "../../../entities/leaveTeacherEntity";
import Leave from "../../../@types/enum/leave";
import { ILeaveStudent } from "../../../entities/leaveStudentEntity";
import { ITimetable } from "../../../entities/timeTableEntity";

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

  async createLeave(leaveData: ILeaveTeacher): Promise<ILeaveTeacher> {
    try {
      const createdLeave = await createLeave(leaveData);
      return createdLeave;
    } catch (error) {
      console.error("Error occurred while creating Leave:", error);
      throw new Error("Failed to create Leave ");
    }
  }

  async findLeaves(teacherId: string): Promise<ILeaveTeacher[]> {
    try {
      const leaves = await findLeavebyTeacherId(teacherId);
      return leaves;
    } catch (error) {
      console.error("Error finding leaves:", error);
      throw new Error("Failed to find leaves");
    }
  }

  async removeLeave(leaveId: string): Promise<void> {
    try {
      await removeLeave(leaveId);
    } catch (error) {
      console.error("Error removing leave:", error);
      throw new Error("Failed to remove leave. Please try again later.");
    }
  }

  async getStudentsLeaves(batch: string): Promise<ILeaveStudent[]> {
    try {
      const leaves = await findStudentsLeaves(batch);
      return leaves;
    } catch (error) {
      console.error("Error fetching leaves:", error);
      throw new Error("Failed to fetch leaves. Please try again later.");
    }
  }

  async updateLeaveStatus(leaveId: string, status: Leave): Promise<void> {
    try {
      await updateLeaveStatus(leaveId, status);
    } catch (error) {
      console.error("Error updating leave:", error);
      throw new Error("Failed to update leave. Please try again later.");
    }
  }

  async getTimetables(teacherId: string): Promise<ITimetable[]> {
    try {
      const timetables = await findTimetables(teacherId);
      return timetables;
    } catch (error) {
      console.error("Error fetching timetables:", error);
      throw new Error("Failed to fetch timetables. Please try again later.");
    }
  }
}
