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
  createMcqSubmit,
  createAssignment,
  findAssignmentbyStudentId,
  findAnsweredMCQs,
  findRemarks,
  getAttendance,
  getBatchRanks,
} from "./studentRepository/index";
import { IAnnouncement } from "../../../entities/announcementEntity";
import { ILeaveStudent } from "../../../entities/leaveStudentEntity";
import { IMessage } from "../../../entities/chatEntity";
import { IGroup } from "../../../entities/groupEntity";
import { ITimetable } from "../../../entities/timeTableEntity";
import { IMcq } from "../../../entities/mcqEntity";
import { IMcqSubmission } from "../../../entities/mcqSubmits";
import { IAssignment } from "../../../entities/assignmentEntity";
import { IRemark } from "../../../entities/remarksEntity";

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

  async getMcqsByBatch(batchId: string, studentId: string): Promise<IMcq[]> {
    try {
      const mcqs = await findbyBatchMcqs(batchId, studentId);
      return mcqs;
    } catch (error) {
      console.error("Error fetching Mcqs:", error);
      throw new Error("Failed to fetch Mcqs. Please try again later.");
    }
  }

  async createMcqSubmit(
    mcqSubmitDetails: IMcqSubmission
  ): Promise<IMcqSubmission> {
    try {
      const answer = await createMcqSubmit(mcqSubmitDetails);
      return answer;
    } catch (error) {
      console.error("Error occurred while creating answer:", error);
      throw new Error("Failed to create answer ");
    }
  }

  async createAssignment(assignment: IAssignment): Promise<IAssignment> {
    try {
      const createdAssignment = await createAssignment(assignment);
      return createdAssignment;
    } catch (error) {
      console.error("Error occurred while creating assignment:", error);
      throw new Error("Failed to create assignment ");
    }
  }

  async findAssignments(studentId: string): Promise<IAssignment[]> {
    try {
      const assignments = await findAssignmentbyStudentId(studentId);
      return assignments;
    } catch (error) {
      console.error("Error occurred while fetching assignments:", error);
      throw new Error("Failed to fetch assignments ");
    }
  }

  async findMcqsAnswered(studentId: string): Promise<IMcqSubmission[]> {
    try {
      const answeredMcqs = await findAnsweredMCQs(studentId);
      return answeredMcqs;
    } catch (error) {
      console.error("Error occurred while fetching answered MCQs:", error);
      throw new Error("Failed to fetch answered MCQs");
    }
  }

  async findRemarks(batchId: string): Promise<IRemark[]> {
    try {
      const remarks = await findRemarks(batchId);
      return remarks;
    } catch (error) {
      console.error("Error finding remarks:", error);
      throw new Error("Failed to find remarks");
    }
  }

  async findAttendance(studentId: string): Promise<any> {
    try {
      const attendance = await getAttendance(studentId);
      return attendance;
    } catch (error) {
      console.error("Error finding attendance:", error);
      throw new Error("Failed to find attendance");
    }
  }

  async findBatchRanks(batchId: string): Promise<IMcqSubmission[]> {
    try {
      const students = await getBatchRanks(batchId);
      return students;
    } catch (error) {
      console.error("Error finding student ranks:", error);
      throw new Error("Failed to find student ranks");
    }
  }
}
