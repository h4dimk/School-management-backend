import { IStudentRepository } from "../interface/repository/studentRepository";
import IJwtService from "../interface/services/jwtService";
import { IStudentUseCase } from "../interface/useCase/studentUseCase";
import ErrorHandler from "../middlewares/errorHandler";
import { Next } from "../../frameworks/types/serverPackageTypes";
import { IHashpassword } from "../interface/services/hashPassword";
import { IStudent } from "../../entities/studentEntity";
import { IAnnouncement } from "../../entities/announcementEntity";
import { ILeaveStudent } from "../../entities/leaveStudentEntity";
import { IMessage } from "../../entities/chatEntity";
import { ITimetable } from "../../entities/timeTableEntity";
import { IMcq } from "../../entities/mcqEntity";
import { IMcqSubmission } from "../../entities/mcqSubmits";
import { IAssignment } from "../../entities/assignmentEntity";
import { IRemark } from "../../entities/remarksEntity";

export class StudentUseCase implements IStudentUseCase {
  private readonly studentRepository: IStudentRepository;
  private readonly jwt: IJwtService;
  private readonly hashPassword: IHashpassword;

  constructor(
    studentRepository: IStudentRepository,
    jwt: IJwtService,
    hashPassword: IHashpassword
  ) {
    this.studentRepository = studentRepository;
    this.jwt = jwt;
    this.hashPassword = hashPassword;
  }

  async login(
    email: string,
    password: string,
    next: Next
  ): Promise<{ student: IStudent; token: string } | void> {
    try {
      const student = await this.studentRepository.findByEmail(email);

      if (student) {
        const passwordMatch = await this.hashPassword.comparePassword(
          password,
          student.password
        );
        // const passwordMatch= password==student.password
        if (passwordMatch && student._id && student.role) {
          const token = await this.jwt.createToken({
            _id: student._id,
            role: student.role,
            // isActive:student.isActive
          });

          student.password = "";
          return { student, token };
        }
      }
      next(new ErrorHandler(401, "Invalid credentials"));
      return;
    } catch (error) {
      console.error("Error occurred while logging in student:", error);
      next(new ErrorHandler(500, "Failed to log in student"));
      return;
    }
  }

  async getStudentProfile(studentId: string): Promise<IStudent | null> {
    try {
      if (!studentId) {
        throw new Error("Student ID is required");
      }
      const student = await this.studentRepository.getStudentById(studentId);
      return student;
    } catch (error) {
      console.error("Error fetching student profile:", error);
      throw new ErrorHandler(500, "Failed to fetch student profile");
    }
  }

  async updateStudentProfile(
    studentId: string,
    updates: Partial<IStudent>
  ): Promise<IStudent> {
    try {
      if (!studentId) {
        throw new Error("Student ID is required");
      }

      if (updates.password) {
        console.log(updates.password);
        const hashedPassword = await this.hashPassword.createHash(
          updates.password
        );
        updates.password = hashedPassword;
      }

      const updatedStudent = await this.studentRepository.updateStudent(
        studentId,
        updates
      );

      if (!updatedStudent) {
        throw new ErrorHandler(404, "Student not found");
      }

      return updatedStudent;
    } catch (error) {
      console.error("Error updating Student profile:", error);
      throw new ErrorHandler(500, "Failed to update Student profile");
    }
  }

  async getAnnouncements(next: Next): Promise<IAnnouncement[]> {
    try {
      const announcements = await this.studentRepository.getAnnouncements();
      return announcements;
    } catch (error) {
      console.error("Error fetching announcements:", error);
      next(new ErrorHandler(500, "Failed to fetch announcements"));
      return [];
    }
  }

  async applyLeave(
    leaveData: ILeaveStudent,
    next: Next
  ): Promise<ILeaveStudent | undefined> {
    try {
      const createdLeave = await this.studentRepository.createLeave(leaveData);
      return createdLeave;
    } catch (error) {
      console.error("Error adding Leave Application:", error);
      next(new ErrorHandler(500, "Failed to add Leave Application"));
    }
  }

  async getLeaves(studentId: string): Promise<ILeaveStudent[]> {
    try {
      const leaves = await this.studentRepository.findLeaves(studentId);
      return leaves;
    } catch (error) {
      console.error("Error getting leaves:", error);
      throw new Error("Failed to get leaves");
    }
  }

  async cancelLeave(leaveId: string): Promise<void> {
    try {
      await this.studentRepository.removeLeave(leaveId);
    } catch (error) {
      console.error("Error canceling leave:", error);
      throw new Error("Failed to cancel leave. Please try again later.");
    }
  }

  async addMessage(messageData: IMessage): Promise<IMessage> {
    try {
      const message = await this.studentRepository.addMessage(messageData);
      return message;
    } catch (error) {
      console.error("Error adding message:", error);
      throw new Error("Failed to add message. Please try again later.");
    }
  }

  async getChats(batchId: string): Promise<IMessage[]> {
    try {
      const chats = await this.studentRepository.findChats(batchId);
      return chats;
    } catch (error) {
      console.error("Error getting chats:", error);
      throw new Error("Failed to get chats");
    }
  }

  async getTimetables(batch: string, next: Next): Promise<ITimetable[]> {
    try {
      const timetables = await this.studentRepository.getTimetables(batch);
      return timetables;
    } catch (error) {
      console.error("Error fetching timetables:", error);
      next(new ErrorHandler(500, "Failed to fetch timetables"));
      return [];
    }
  }

  async findMcqsByBatch(
    batchId: string,
    studentId: string,
    next: Next
  ): Promise<IMcq[]> {
    try {
      const mcqs = await this.studentRepository.getMcqsByBatch(
        batchId,
        studentId
      );
      return mcqs;
    } catch (error) {
      console.error("Error fetching Mcqs:", error);
      next(
        new ErrorHandler(500, "Failed to fetch Mcqs. Please try again later.")
      );
      return [];
    }
  }

  async submitAnswer(answer: IMcqSubmission, next: Next): Promise<void> {
    try {
      await this.studentRepository.createMcqSubmit(answer);
    } catch (error) {
      console.error("Error submiting Answer:", error);
      next(new ErrorHandler(500, "Failed to submit Answer"));
    }
  }

  async addAssignment(assignment: IAssignment, next: Next): Promise<void> {
    try {
      await this.studentRepository.createAssignment(assignment);
    } catch (error) {
      console.error("Error occurred while add assignment:", error);
      next(new ErrorHandler(500, "Failed to add Assignment"));
    }
  }

  async getAssignments(studentId: string, next: Next): Promise<IAssignment[]> {
    try {
      const assignments = await this.studentRepository.findAssignments(
        studentId
      );
      return assignments;
    } catch (error) {
      console.error("Error occurred while fetching assignments:", error);
      next(new ErrorHandler(500, "Failed to fetch Assignment"));
      return [];
    }
  }

  async getAnsweredMcqs(
    studentId: string,
    next: Next
  ): Promise<IMcqSubmission[]> {
    try {
      const mcqs = await this.studentRepository.findMcqsAnswered(studentId);
      return mcqs;
    } catch (error) {
      console.error("Error occurred while fetching Answered Mcqs:", error);
      next(new ErrorHandler(500, "Failed to fetch Answered Mcqs"));
      return [];
    }
  }

  async getRemarks(batchId: string): Promise<IRemark[]> {
    try {
      const remarks = await this.studentRepository.findRemarks(batchId);
      return remarks;
    } catch (error) {
      console.error("Error getting remarks:", error);
      throw new Error("Failed to get remarks");
    }
  }

  async getAttendance(studentId: string): Promise<any> {
    try {
      const attendance = await this.studentRepository.findAttendance(studentId);
      return attendance;
    } catch (error) {
      console.error("Error getting attendance:", error);
      throw new Error("Failed to get attendance");
    }
  }

  async getBatchRanks(batchId: string, next: Next): Promise<IMcqSubmission[]> {
    try {
      const students = await this.studentRepository.findBatchRanks(batchId);
      return students;
    } catch (error) {
      console.error("Error finding student ranks:", error);
      next(new ErrorHandler(500, "Failed to find student ranks:"));
      return [];
    }
  }
}
