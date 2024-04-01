import { ITeacherRepository } from "../interface/repository/teacherRepository";
import { ITeacherUseCase } from "../interface/useCase/teacherUseCase";
import { ITeacher } from "../../entities/teacherEntity";
import IJwtService from "../interface/services/jwtService";
import ErrorHandler from "../middlewares/errorHandler";
import { Next } from "../../frameworks/types/serverPackageTypes";
import { IHashpassword } from "../interface/services/hashPassword";
import { IAnnouncement } from "../../entities/announcementEntity";
import { IAttendence } from "../../entities/attendenceEntity";

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
}
