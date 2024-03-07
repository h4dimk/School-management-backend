import { IAdminRepository } from "../interface/repository/adminRepository";
import { IAdminUseCase } from "../interface/useCase/adminUseCase";
import { IAdmin } from "../../entities/adminEntity";
import { ITeacher } from "../../entities/teacherEntity";

export class AdminUseCase implements IAdminUseCase {
  private adminRepository: IAdminRepository;

  constructor(adminRepository: IAdminRepository) {
    this.adminRepository = adminRepository;
  }

  async login(email: string, password: string): Promise<string> {
    try {
      const admin = await this.adminRepository.findByEmail(email);
      console.log(admin);
      if (admin && admin.password === password) {
        const token = "generated_token";
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
      await this.adminRepository.removeTeacher(teacherId)
      console.log(`Teacher with ID ${teacherId} has been removed successfully`);
    } catch (error) {
      console.error('Error removing teacher:', error);
      throw new Error('Failed to remove teacher');
    }
    
  }
}
