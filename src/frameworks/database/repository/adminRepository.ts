import adminModel from "../models/adminModel";

import { IAdminRepository } from "../../../useCases/interface/repository/adminRepository";
import { IAdmin } from "../../../entities/adminEntity";

import { findByEmail } from "./adminRepository/index";

export class AdminRepository implements IAdminRepository {
  constructor(private adminModels: typeof adminModel) {}

  async findByEmail(email: string): Promise<IAdmin | null> {
    try {
      const adminExist = await findByEmail(email);
      return adminExist;
    } catch (error) {
      console.error("Error occurred while logging in admin:", error);
      throw new Error("Failed to log in admin");
    }
  }

  async create(admin: IAdmin): Promise<void> {
    try {
        await adminModel.create(admin);
    } catch (error) {
        console.error('Error creating admin:', error);
        throw new Error('Failed to create admin');
    }
}

  
}
