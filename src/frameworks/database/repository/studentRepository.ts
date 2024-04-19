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
  createMessage,
  findChats,
  findTimetables,
  findbyBatchMcqs,
} from "./studentRepository/index";
import { IAnnouncement } from "../../../entities/announcementEntity";
import { ILeaveStudent } from "../../../entities/leaveStudentEntity";
import { IMessage } from "../../../entities/chatEntity";
import { IGroup } from "../../../entities/groupEntity";
import { ITimetable } from "../../../entities/timeTableEntity";
import { IMcq } from "../../../entities/mcqEntity";

export class StudentRepository implements IStudentRepository {
  constructor(private studentModels: typeof studentModel) {}

  async findByEmail(email: string): Promise<IStudent | null> {
    try {
      const studentExist = await findByEmail(email);
      return studentExist;
    } catch (error) {
      console.error("Error occurred while logging in student:", error);
      throw new Error("Failed to log instudent");
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

  async addMessage(messageData: IMessage): Promise<IMessage> {
    try {
      const createdMessage = await createMessage(messageData);
      return createdMessage;
    } catch (error) {
      console.error("Error occurred while creating Message:", error);
      throw new Error("Failed to create Message ");
    }
  }

  async findChats(batchId: string): Promise<IMessage[]> {
    try {
      const Messages = await findChats(batchId);
      return Messages;
    } catch (error) {
      console.error("Error finding leaves:", error);
      throw new Error("Failed to find leaves");
    }
  }

  async getTimetables(batch: string): Promise<ITimetable[]> {
    try {
      const timetables = await findTimetables(batch);
      return timetables;
    } catch (error) {
      console.error("Error fetching timetables:", error);
      throw new Error("Failed to fetch timetables. Please try again later.");
    }
  }

  async getMcqsByBatch(batchId: string): Promise<IMcq[]> {
    try {
      const mcqs = await findbyBatchMcqs(batchId);
      return mcqs;
    } catch (error) {
      console.error("Error fetching Mcqs:", error);
      throw new Error("Failed to fetch Mcqs. Please try again later.");
    }
  }
}
