import { IAdminRepository } from "../interface/repository/adminRepository";
import { IAdminUseCase } from "../interface/useCase/adminUseCase";
import { IAdmin } from "../../entities/adminEntity";
import { ITeacher } from "../../entities/teacherEntity";
import { IStudent } from "../../entities/studentEntity";
import { ICourse } from "../../entities/courseEntity";
import IJwtService from "../interface/services/jwtService";
import { ISendEmail } from "../interface/services/sendMail";
import ErrorHandler from "../middlewares/errorHandler";
import { Next } from "../../frameworks/types/serverPackageTypes";
import { IHashpassword } from "../interface/services/hashPassword";
import { IBatch } from "../../entities/batchEntity";
import { IAnnouncement } from "../../entities/announcementEntity";
import { Server } from "socket.io";
import { ILeaveTeacher } from "../../entities/leaveTeacherEntity";
import { ILeaveStudent } from "../../entities/leaveStudentEntity";
import Leave from "../../@types/enum/leave";

export class AdminUseCase implements IAdminUseCase {
  private readonly adminRepository: IAdminRepository;
  private readonly jwt: IJwtService;
  private readonly sendMail: ISendEmail;
  private readonly hashPassword: IHashpassword;
  // private readonly io:Server;

  constructor(
    adminRepository: IAdminRepository,
    jwt: IJwtService,
    sendMail: ISendEmail,
    hashPassword: IHashpassword
    // io: Server
  ) {
    this.adminRepository = adminRepository;
    this.jwt = jwt;
    this.sendMail = sendMail;
    this.hashPassword = hashPassword;
    // this.io = io;
  }

  async login(
    email: string,
    password: string,
    next: Next
  ): Promise<{ admin: IAdmin; token: string } | void> {
    try {
      const admin = await this.adminRepository.findByEmail(email);

      if (admin) {
        const passwordMatch = await this.hashPassword.comparePassword(
          password,
          admin.password
        );

        // const passwordMatch= password==admin.password
        if (passwordMatch && admin._id && admin.role) {
          const token = await this.jwt.createToken({
            _id: admin._id,
            role: admin.role,
          });

          admin.password = "";
          return { admin, token };
        } else {
          next(new ErrorHandler(401, "Invalid credentials"));
          return;
        }
      }
    } catch (error) {
      console.error("Error occurred while logging in admin:", error);
      next(new ErrorHandler(500, "Failed to log in admin"));
      return;
    }
  }

  async addTeacher(teacher: ITeacher, next: Next): Promise<void> {
    try {
      const existingTeacher = await this.adminRepository.findTeacher(
        teacher.email
      );
      if (existingTeacher) {
        next(new ErrorHandler(400, "Teacher with this email already exists"));
        return;
      }
      const existingStudent = await this.adminRepository.findStudent(
        teacher.email
      );
      if (existingStudent) {
        next(new ErrorHandler(400, "Student with this email already exists"));
        return;
      }

      this.sendMail.sendEmail(teacher.name, teacher.email, teacher.password);

      const hashedPassword = await this.hashPassword.createHash(
        teacher.password
      );
      teacher.password = hashedPassword;

      return await this.adminRepository.createTeacher(teacher);
    } catch (error) {
      console.error("Error creating teacher:", error);
      next(new ErrorHandler(500, "Failed to create teacher"));
    }
  }

  async getTeachers(next: Next): Promise<ITeacher[]> {
    try {
      const teachers = await this.adminRepository.getTeachers();
      return teachers;
    } catch (error) {
      console.error("Error fetching teachers:", error);
      next(new ErrorHandler(500, "Failed to fetch teachers"));
      return [];
    }
  }

  async blockTeacher(teacherId: string, next: Next): Promise<boolean> {
    try {
      const isActive = await this.adminRepository.blockTeacher(teacherId);
      return isActive;
    } catch (error) {
      console.error("Error blocking/unblocking teacher:", error);
      next(new ErrorHandler(500, "Failed to block/unblock teacher"));
      return false;
    }
  }

  async removeTeacher(teacherId: string, next: Next): Promise<void> {
    try {
      await this.adminRepository.removeTeacher(teacherId);
    } catch (error) {
      console.error("Error removing teacher:", error);
      next(new ErrorHandler(500, "Failed to remove teacher"));
    }
  }

  async addStudent(student: IStudent, next: Next): Promise<void> {
    try {
      const existingStudent = await this.adminRepository.findStudent(
        student.email
      );
      if (existingStudent) {
        next(new ErrorHandler(400, "Student with this email already exists"));
        return;
      }
      const existingTeacher = await this.adminRepository.findTeacher(
        student.email
      );
      if (existingTeacher) {
        next(new ErrorHandler(400, "Teacher with this email already exists"));
        return;
      }

      this.sendMail.sendEmail(student.name, student.email, student.password);

      const hashedPassword = await this.hashPassword.createHash(
        student.password
      );
      student.password = hashedPassword;

      const createdStudent = await this.adminRepository.createStudent(student);
      await this.adminRepository.updateBatch(
        student.batchId,
        createdStudent._id ?? "defaultStudentId"
      );
    } catch (error) {
      console.error("Error creating student:", error);
      next(new ErrorHandler(500, "Failed to create student"));
    }
  }

  async getStudents(next: Next): Promise<IStudent[]> {
    try {
      const students = await this.adminRepository.getStudents();
      return students;
    } catch (error) {
      console.error("Error fetching students:", error);
      next(new ErrorHandler(500, "Failed to fetch students"));
      return [];
    }
  }

  async blockStudent(studentId: string, next: Next): Promise<boolean> {
    try {
      const isActive = await this.adminRepository.blockStudent(studentId);
      return isActive;
    } catch (error) {
      console.error("Error blocking/unblocking student:", error);
      next(new ErrorHandler(500, "Failed to block/unblock student"));
      return false;
    }
  }

  async removeStudent(studentId: string, next: Next): Promise<void> {
    try {
      await this.adminRepository.removeStudent(studentId);
    } catch (error) {
      console.error("Error removing student:", error);
      next(new ErrorHandler(500, "Failed to remove student"));
    }
  }

  async addCourse(course: ICourse, next: Next): Promise<void> {
    try {
      const existingCourse = await this.adminRepository.findCourse(
        course.course
      );
      if (existingCourse) {
        next(new ErrorHandler(400, "Course with this name already exists"));
        return;
      }
      return await this.adminRepository.createCourse(course);
    } catch (error) {
      console.error("Error creating course:", error);
      next(new ErrorHandler(500, "Failed to create course"));
    }
  }

  async getCourses(next: Next): Promise<ICourse[]> {
    try {
      const courses = await this.adminRepository.getCourse();
      return courses;
    } catch (error) {
      console.error("Error fetching courses:", error);
      next(new ErrorHandler(500, "Failed to fetch courses"));
      return [];
    }
  }

  async removeCourse(courseId: string, next: Next): Promise<void> {
    try {
      await this.adminRepository.removeCourse(courseId);
    } catch (error) {
      console.error("Error removing course:", error);
      next(new ErrorHandler(500, "Failed to remove course"));
    }
  }

  async getAdminProfile(adminId: string): Promise<IAdmin | null> {
    try {
      if (!adminId) {
        throw new Error("Admin ID is required");
      }
      const admin = await this.adminRepository.getAdminById(adminId);
      return admin;
    } catch (error) {
      console.error("Error fetching admin profile:", error);
      throw new ErrorHandler(500, "Failed to fetch admin profile");
    }
  }

  async updateAdminProfile(
    adminId: string,
    updates: Partial<IAdmin>
  ): Promise<IAdmin> {
    try {
      if (!adminId) {
        throw new Error("Admin ID is required");
      }

      if (updates.password) {
        const hashedPassword = await this.hashPassword.createHash(
          updates.password
        );
        updates.password = hashedPassword;
      }

      const updatedAdmin = await this.adminRepository.updateAdmin(
        adminId,
        updates
      );

      if (!updatedAdmin) {
        throw new ErrorHandler(404, "Admin not found");
      }

      return updatedAdmin;
    } catch (error) {
      console.error("Error updating admin profile:", error);
      throw new ErrorHandler(500, "Failed to update admin profile");
    }
  }

  async addBatch(batch: IBatch, next: Next): Promise<void> {
    try {
      await this.adminRepository.addBatch(batch);
    } catch (error) {
      console.error("Error creating batch:", error);
      next(new ErrorHandler(500, "Failed to create batch"));
    }
  }

  async getBatches(next: Next): Promise<IBatch[]> {
    try {
      const batches = await this.adminRepository.getBatches();
      return batches;
    } catch (error) {
      console.error("Error fetching batches:", error);
      next(new ErrorHandler(500, "Failed to fetch batches"));
      return [];
    }
  }

  async removeBatch(batchId: string, next: Next): Promise<void> {
    try {
      await this.adminRepository.removeBatch(batchId);
    } catch (error) {
      console.error("Error removing batch:", error);
      next(new ErrorHandler(500, "Failed to remove batch"));
    }
  }

  async addAnnouncement(
    announcementData: IAnnouncement,
    next: Next
  ): Promise<void> {
    try {
      const newAnnouncement = await this.adminRepository.addAnnouncement(
        announcementData
      );
      // this.io.emit('newAnnouncement', newAnnouncement);
      return newAnnouncement;
    } catch (error) {
      console.error("Error creating annousment:", error);
      next(new ErrorHandler(500, "Failed to create annousment"));
    }
  }

  async getAnnouncements(next: Next): Promise<IAnnouncement[]> {
    try {
      const announcements = await this.adminRepository.getAnnouncements();
      return announcements;
    } catch (error) {
      console.error("Error fetching announcements:", error);
      next(new ErrorHandler(500, "Failed to fetch announcements"));
      return [];
    }
  }

  async removeAnnouncemet(announcementId: string, next: Next): Promise<void> {
    try {
      await this.adminRepository.removeAnnouncement(announcementId);
    } catch (error) {
      console.error("Error removing annousment:", error);
      next(new ErrorHandler(500, "Failed to remove annousment"));
    }
  }

  async getTeachersLeaves(next: Next): Promise<ILeaveTeacher[]> {
    try {
      const leaves = await this.adminRepository.getTeachersLeaves();
      return leaves;
    } catch (error) {
      console.error("Error fetching leaves:", error);
      next(new ErrorHandler(500, "Failed to fetch leaves"));
      return [];
    }
  }

  async getStudentsLeaves(next: Next): Promise<ILeaveStudent[]> {
    try {
      const leaves = await this.adminRepository.getStudentsLeaves();
      return leaves;
    } catch (error) {
      console.error("Error fetching leaves:", error);
      next(new ErrorHandler(500, "Failed to fetch leaves"));
      return [];
    }
  }

  async updateTeacherLeaveStatus(
    leaveId: string,
    status: Leave,
    next: Next
  ): Promise<void> {
    try {
      await this.adminRepository.updateTeachersLeaveStatus(leaveId, status);
    } catch (error) {
      console.error("Error updating leave status:", error);
      next(new ErrorHandler(500, "Failed to update leave status"));
    }
  }

  async updateStudentsLeaveStatus(
    leaveId: string,
    status: Leave,
    next: Next
  ): Promise<void> {
    try {
      await this.adminRepository.updateStudentsLeaveStatus(leaveId, status);
    } catch (error) {
      console.error("Error updating leave status:", error);
      next(new ErrorHandler(500, "Failed to update leave status"));
    }
  }
}
