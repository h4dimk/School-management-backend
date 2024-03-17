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

export class AdminUseCase implements IAdminUseCase {
  private readonly adminRepository: IAdminRepository;
  private readonly jwt: IJwtService;
  private readonly sendMail: ISendEmail;
  private readonly hashPassword: IHashpassword;

  constructor(
    adminRepository: IAdminRepository,
    jwt: IJwtService,
    sendMail: ISendEmail,
    hashPassword: IHashpassword
  ) {
    this.adminRepository = adminRepository;
    this.jwt = jwt;
    this.sendMail = sendMail;
    this.hashPassword = hashPassword;
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

      return await this.adminRepository.createStudent(student);
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
}
