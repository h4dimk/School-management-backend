import { IAdminRepository } from "../interface/repository/adminRepository";
import { IAdminUseCase } from "../interface/useCase/adminUseCase";
import { IAdmin } from "../../entities/adminEntity";

export class AdminUseCase implements IAdminUseCase {
  private readonly adminRepository: IAdminRepository;

  constructor(adminRepository: IAdminRepository) {
    this.adminRepository = adminRepository;
  }

  async login(email: string, password: string): Promise<string> {
    try {
      const admin = await this.adminRepository.findByEmail(email);
      if (admin && admin.password === password) {
        const token = "generated_token"; // Replace with actual token generation logic
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
        // Check if admin already exists with the given email
        const existingAdmin = await this.adminRepository.findByEmail(email);
        if (existingAdmin) {
            throw new Error('Admin with this email already exists');
        }
        
        // Create the admin object
        const admin: IAdmin = { email, password };

        // Insert the admin data into the repository
        await this.adminRepository.create(admin);
    } catch (error) {
        console.error('Error creating admin:', error);
        throw new Error('Failed to create admin');
    }
}
}
