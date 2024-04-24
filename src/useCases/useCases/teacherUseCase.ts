import { ITeacherRepository } from "../interface/repository/teacherRepository";
import { ITeacherUseCase } from "../interface/useCase/teacherUseCase";
import { ITeacher } from "../../entities/teacherEntity";
import IJwtService from "../interface/services/jwtService";
import ErrorHandler from "../middlewares/errorHandler";
import { Next } from "../../frameworks/types/serverPackageTypes";
import { IHashpassword } from "../interface/services/hashPassword";
import { IAnnouncement } from "../../entities/announcementEntity";
import { IAttendence } from "../../entities/attendenceEntity";
import { ILeaveTeacher } from "../../entities/leaveTeacherEntity";
import { ILeaveStudent } from "../../entities/leaveStudentEntity";
import Leave from "../../@types/enum/leave";
import { ITimetable } from "../../entities/timeTableEntity";
import { IMcq } from "../../entities/mcqEntity";
import { IAssignment } from "../../entities/assignmentEntity";
import { Io } from "../../frameworks/webserver/config/socket";

export class TeacherUseCase implements ITeacherUseCase {
  private readonly teacherRepository: ITeacherRepository;
  private readonly jwt: IJwtService;
  private readonly hashPassword: IHashpassword;

  constructor(
    teacherRepository: ITeacherRepository,
    jwt: IJwtService,
    hashedPassword: IHashpassword
  ) {
    this.teacherRepository = teacherRepository;
    this.jwt = jwt;
    this.hashPassword = hashedPassword;
  }

  async login(
    email: string,
    password: string,
    next: Next
  ): Promise<{ teacher: ITeacher; token: string } | void> {
    try {
      const teacher = await this.teacherRepository.findByEmail(email);

      if (teacher) {
        const passwordMatch = await this.hashPassword.comparePassword(
          password,
          teacher.password
        );

        // const passwordMatch=password== teacher.password

        if (passwordMatch && teacher._id && teacher.role) {
          const token = await this.jwt.createToken({
            _id: teacher._id,
            role: teacher.role,
            // isActive: teacher.isActive,
          });
          teacher.password = "";
          return { teacher, token };
        }
      }

      next(new ErrorHandler(401, "Invalid credentials"));
      return;
    } catch (error) {
      console.error("Error occurred while logging in teacher:", error);
      next(new ErrorHandler(500, "Failed to log in teacher"));
      return;
    }
  }

  async getTeacherProfile(teacherId: string): Promise<ITeacher | null> {
    try {
      if (!teacherId) {
        throw new Error("Teacher ID is required");
      }
      const teacher = await this.teacherRepository.getTeacherById(teacherId);
      return teacher;
    } catch (error) {
      console.error("Error fetching teacher profile:", error);
      throw new ErrorHandler(500, "Failed to fetch teacher profile");
    }
  }

  async updateTeacherProfile(
    teacherId: string,
    updates: Partial<ITeacher>
  ): Promise<ITeacher> {
    try {
      if (!teacherId) {
        throw new Error("Teacher ID is required");
      }
      if (updates.password) {
        const hashedPassword = await this.hashPassword.createHash(
          updates.password
        );
        updates.password = hashedPassword;
      }

      const updatedTeacher = await this.teacherRepository.updateTeacher(
        teacherId,
        updates
      );

      if (!updatedTeacher) {
        throw new ErrorHandler(404, "Teacher not found");
      }

      return updatedTeacher;
    } catch (error) {
      console.error("Error updating Teacher profile:", error);
      throw new ErrorHandler(500, "Failed to update Teacher profile");
    }
  }

  async getAnnouncements(next: Next): Promise<IAnnouncement[]> {
    try {
      const announcements = await this.teacherRepository.getAnnouncements();

      return announcements;
    } catch (error) {
      console.error("Error fetching announcements:", error);
      next(new ErrorHandler(500, "Failed to fetch announcements"));
      return [];
    }
  }

  async addAttendance(
    attendance: IAttendence,
    next: Next
  ): Promise<IAttendence | undefined> {
    try {
      const createdAttendance = await this.teacherRepository.createAttendence(
        attendance
      );
      return createdAttendance;
    } catch (error) {
      console.error("Error adding attendance:", error);
      next(new ErrorHandler(500, "Failed to add attendance"));
    }
  }

  async getAttendance(batchId: string, next: Next): Promise<IAttendence[]> {
    try {
      const attendance = await this.teacherRepository.getAttendance(batchId);
      return attendance;
    } catch (error) {
      console.error("Error fetching attendance:", error);
      next(new ErrorHandler(500, "Failed to fetch attendance"));
      return [];
    }
  }

  async applyLeave(
    leaveData: ILeaveTeacher,
    next: Next
  ): Promise<ILeaveTeacher | undefined> {
    try {
      const createdLeave = await this.teacherRepository.createLeave(leaveData);
      return createdLeave;
    } catch (error) {
      console.error("Error adding Leave Application:", error);
      next(new ErrorHandler(500, "Failed to add Leave Application"));
    }
  }

  async getLeaves(studentId: string): Promise<ILeaveTeacher[]> {
    try {
      const leaves = await this.teacherRepository.findLeaves(studentId);
      return leaves;
    } catch (error) {
      console.error("Error getting leaves:", error);
      throw new Error("Failed to get leaves");
    }
  }

  async cancelLeave(leaveId: string): Promise<void> {
    try {
      await this.teacherRepository.removeLeave(leaveId);
    } catch (error) {
      console.error("Error canceling leave:", error);
      throw new Error("Failed to cancel leave. Please try again later.");
    }
  }

  async getStudentsLeaves(batch: string, next: Next): Promise<ILeaveStudent[]> {
    try {
      const leaves = await this.teacherRepository.getStudentsLeaves(batch);
      return leaves;
    } catch (error) {
      console.error("Error fetching leaves:", error);
      next(new ErrorHandler(500, "Failed to fetch leaves"));
      return [];
    }
  }

  async updateLeaveStatus(
    leaveId: string,
    status: Leave,
    next: Next
  ): Promise<void> {
    try {
      await this.teacherRepository.updateLeaveStatus(leaveId, status);
    } catch (error) {
      console.error("Error updating leave status:", error);
      next(new ErrorHandler(500, "Failed to update leave status"));
    }
  }

  async getTimetables(teacherId: string, next: Next): Promise<ITimetable[]> {
    try {
      const timetables = await this.teacherRepository.getTimetables(teacherId);
      return timetables;
    } catch (error) {
      console.error("Error fetching timetables:", error);
      next(
        new ErrorHandler(
          500,
          "Failed to fetch timetables. Please try again later."
        )
      );
      return [];
    }
  }

  async addMcq(mcqDetails: IMcq, next: Next): Promise<void> {
    try {
      await this.teacherRepository.createMcqs(mcqDetails);
    } catch (error) {
      console.error("Error occurred while adding Mcqs:", error);
      next(new ErrorHandler(500, "Failed to add Mcq. Please try again later."));
    }
  }

  async findMcqsByTeacher(teacherId: string, next: Next): Promise<IMcq[]> {
    try {
      const mcqs = await this.teacherRepository.getMcqsByTeacher(teacherId);
      return mcqs;
    } catch (error) {
      console.error("Error fetching Mcqs:", error);
      next(
        new ErrorHandler(500, "Failed to fetch Mcqs. Please try again later.")
      );
      return [];
    }
  }

  async findMcqsByBatch(batchId: string, next: Next): Promise<IMcq[]> {
    try {
      const mcqs = await this.teacherRepository.getMcqsByBatch(batchId);
      return mcqs;
    } catch (error) {
      console.error("Error fetching Mcqs:", error);
      next(
        new ErrorHandler(500, "Failed to fetch Mcqs. Please try again later.")
      );
      return [];
    }
  }
  async getAssignments(batchId: string, next: Next): Promise<IAssignment[]> {
    try {
      const assignments = await this.teacherRepository.findAssignments(batchId);
      return assignments;
    } catch (error) {
      console.error("Error occurred while fetching assignments:", error);
      next(new ErrorHandler(500, "Failed to fetch Assignment"));
      return [];
    }
  }
}
