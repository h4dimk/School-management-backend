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
  findbyBatchMcqs,
  findbyTeacherMcqs,
  createMcq,
  findAssignmentbyBatchId,
  getBatches,
  createRemark,
  findRemarks,
} from "./teacherRepository/index";
import { IAnnouncement } from "../../../entities/announcementEntity";
import { IAttendence } from "../../../entities/attendenceEntity";
import { ILeaveTeacher } from "../../../entities/leaveTeacherEntity";
import Leave from "../../../@types/enum/leave";
import { ILeaveStudent } from "../../../entities/leaveStudentEntity";
import { ITimetable } from "../../../entities/timeTableEntity";
import { IMcq } from "../../../entities/mcqEntity";
import { IAssignment } from "../../../entities/assignmentEntity";
import { IMessage } from "../../../entities/chatEntity";
import { IRemark } from "../../../entities/remarksEntity";
import { IBatch } from "../../../entities/batchEntity";

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

  async createMcqs(mcqDetails: IMcq): Promise<IMcq> {
    try {
      const createdMcq = await createMcq(mcqDetails);
      return createdMcq;
    } catch (error) {
      console.error("Error occurred while creating Mcqs:", error);
      throw new Error("Failed to create Mcqs ");
    }
  }

  async getMcqsByTeacher(teacherId: string): Promise<IMcq[]> {
    try {
      const mcqs = await findbyTeacherMcqs(teacherId);

      return mcqs;
    } catch (error) {
      console.error("Error fetching Mcqs:", error);
      throw new Error("Failed to fetch Mcqs. Please try again later.");
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
  async findAssignments(batchId: string): Promise<IAssignment[]> {
    try {
      const assignments = await findAssignmentbyBatchId(batchId);
      return assignments;
    } catch (error) {
      console.error("Error occurred while fetching assignments:", error);
      throw new Error("Failed to fetch assignments ");
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

  async createRemarks(remark: IRemark): Promise<IRemark> {
    try {
      const createdRemark = await createRemark(remark);
      return createdRemark;
    } catch (error) {
      console.error("Error creating remark:", error);
      throw new Error("Failed to create remark");
    }
  }

  async findRemarks(teacherId: string): Promise<IRemark[]> {
    try {
      const remarks = await findRemarks(teacherId);
      return remarks;
    } catch (error) {
      console.error("Error finding remarks:", error);
      throw new Error("Failed to find remarks");
    }
  }

  async findBatches(): Promise<IBatch[]> {
    try {
      const batches = await getBatches();
      return batches;
    } catch (error) {
      console.error("Error finding batches:", error);
      throw new Error("Failed to find batches");
    }
  }
}
