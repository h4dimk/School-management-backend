import { IAdminRepository } from "../interface/repository/adminRepository";
import { IAdminUseCase } from "../interface/useCase/adminUseCase";
import { IAdmin } from "../../entities/adminEntity";
import { ITeacher } from "../../entities/teacherEntity";
import { IStudent } from "../../entities/studentEntity";
import { ICourse } from "../../entities/courseEntity";
import IJwtService from "../interface/services/jwtService";
import { ISendEmail } from "../interface/services/sendMail";

export class AdminUseCase implements IAdminUseCase {
  private readonly adminRepository: IAdminRepository;
  private readonly jwt: IJwtService;
  private readonly sendMail: ISendEmail;

  constructor(
    adminRepository: IAdminRepository,
    jwt: IJwtService,
    sendMail: ISendEmail
  ) {
    this.adminRepository = adminRepository;
    this.jwt = jwt;
    this.sendMail = sendMail;
  }

  async login(email: string, password: string): Promise<string> {
    try {
      const admin = await this.adminRepository.findByEmail(email);

      if (admin && admin.password === password && admin._id && admin.role) {
        const token = this.jwt.createToken({
          _id: admin._id,
          role: admin.role,
        });
        return token;
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Error occurred while logging in admin:", error);
      throw new Error("Failed to log in admin");
    }
  }

  async createAdmin(email: string, password: string): Promise<void> {
    try {
      console.log(email, password, "usecase");
      // Check if admin already exists with the given email
      const existingAdmin = await this.adminRepository.findByEmail(email);
      if (existingAdmin) {
        throw new Error("Admin with this email already exists");
      }

      // Create the admin object
      const admin: IAdmin = { email, password };

      // Insert the admin data into the repository
      await this.adminRepository.create(admin);
    } catch (error) {
      console.error("Error creating admin:", error);
      throw new Error("Failed to create admin");
    }
  }

  async addTeacher(teacher: ITeacher): Promise<void> {
    try {
      const existingTeacher = await this.adminRepository.findTeacher(
        teacher.email
      );
      if (existingTeacher) {
        throw new Error("Teacher with this email already exists");
      }
      const existingStudent = await this.adminRepository.findStudent(
        teacher.email
      );
      if (existingStudent) {
        throw new Error("Student with this email already exists");
      }

      this.sendMail.sendEmail(
        teacher.name,
        teacher.email,
        teacher.password ?? `${teacher.name}123`
      );

      return await this.adminRepository.createTeacher(teacher);
    } catch (error) {
      console.error("Error creating teacher:", error);
      throw new Error("Failed to create teacher");
    }
  }

  async getTeachers(): Promise<ITeacher[]> {
    try {
      const teachers = await this.adminRepository.getTeachers();
      return teachers;
    } catch (error) {
      console.error("Error fetching teachers:", error);
      throw new Error("Failed to fetch teachers");
    }
  }

  async blockTeacher(teacherId: string): Promise<boolean> {
    try {
      const isActive = await this.adminRepository.blockTeacher(teacherId);
      return isActive;
    } catch (error) {
      console.error("Error blocking/unblocking teacher:", error);
      throw new Error("Failed to block/unblock teacher");
    }
  }

  async removeTeacher(teacherId: string): Promise<void> {
    try {
      await this.adminRepository.removeTeacher(teacherId);
    } catch (error) {
      console.error("Error removing teacher:", error);
      throw new Error("Failed to remove teacher");
    }
  }

  async addStudent(student: IStudent): Promise<void> {
    try {
      const existingStudent = await this.adminRepository.findStudent(
        student.email
      );
      if (existingStudent) {
        throw new Error("Student with this email already exists");
      }
      const existingTeacher = await this.adminRepository.findTeacher(
        student.email
      );
      if (existingTeacher) {
        throw new Error("Teacher with this email already exists");
      }

      return await this.adminRepository.createStudent(student);
    } catch (error) {
      console.error("Error creating student:", error);
      throw new Error("Failed to create student");
    }
  }

  async getStudents(): Promise<IStudent[]> {
    try {
      const students = await this.adminRepository.getStudents();
      return students;
    } catch (error) {
      console.error("Error fetching students:", error);
      throw new Error("Failed to fetch students");
    }
  }

  async blockStudent(studentId: string): Promise<boolean> {
    try {
      const isActive = await this.adminRepository.blockStudent(studentId);
      return isActive;
    } catch (error) {
      console.error("Error blocking/unblocking student:", error);
      throw new Error("Failed to block/unblock student");
    }
  }

  async removeStudent(studentId: string): Promise<void> {
    try {
      await this.adminRepository.removeStudent(studentId);
    } catch (error) {
      console.error("Error removing student:", error);
      throw new Error("Failed to remove student");
    }
  }

  async addCourse(course: ICourse): Promise<void> {
    try {
      const existingCourse = await this.adminRepository.findCourse(
        course.course
      );
      if (existingCourse) {
        throw new Error("Course with this email already exists");
      }
      return await this.adminRepository.createCourse(course);
    } catch (error) {
      console.error("Error creating course:", error);
      throw new Error("Failed to create course");
    }
  }

  async getCourses(): Promise<ICourse[]> {
    try {
      const courses = await this.adminRepository.getCourse();
      return courses;
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw new Error("Failed to fetch courses");
    }
  }

  async removeCourse(courseId: string): Promise<void> {
    try {
      await this.adminRepository.removeCourse(courseId);
    } catch (error) {
      console.error("Error removing course:", error);
      throw new Error("Failed to remove course");
    }
  }
}
