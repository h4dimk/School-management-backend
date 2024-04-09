import studentModel from "../models/studentModel";

import { IStudentRepository } from "../../../useCases/interface/repository/studentRepository";
import { IStudent } from "../../../entities/studentEntity";

import {
  findByEmail,
  getAnnouncements,
  getStudentById,
  updateStudent,
  createLeave,
  findLeavebyStudentId,
  removeLeave,
} from "./studentRepository/index";
import { IAnnouncement } from "../../../entities/announcementEntity";
import { ILeaveStudent } from "../../../entities/leaveStudentEntity";

export class StudentRepository implements IStudentRepository {
  constructor(private studentModels: typeof studentModel) {}

  async findByEmail(email: string): Promise<IStudent | null> {
    try {
      const studentExist = await findByEmail(email);
      return studentExist;
    } catch (error) {
      console.error("Error occurred while logging in student:", error);
      throw new Error("Failed to log in student");
    }
  }

  async getStudentById(studentId: string): Promise<IStudent | null> {
    try {
      if (!studentId) {
        throw new Error("Student ID is required");
      }

      const student = await getStudentById(studentId);

      return student;
    } catch (error) {
      throw new Error("Failed to fetch student");
    }
  }

  async updateStudent(
    studentId: string,
    student: Partial<IStudent>
  ): Promise<IStudent> {
    try {
      if (!studentId) {
        throw new Error("Student ID is required");
      }
      const updatedStudent = await updateStudent(studentId, student);
      return updatedStudent;
    } catch (error) {
      throw new Error("Failed to update student");
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

  async createLeave(leaveData: ILeaveStudent): Promise<ILeaveStudent> {
    try {
      const createdLeave = await createLeave(leaveData);
      return createdLeave;
    } catch (error) {
      console.error("Error occurred while creating Leave:", error);
      throw new Error("Failed to create Leave ");
    }
  }

  async findLeaves(studentId: string): Promise<ILeaveStudent[]> {
    try {
      const leaves = await findLeavebyStudentId(studentId);
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
  
}
