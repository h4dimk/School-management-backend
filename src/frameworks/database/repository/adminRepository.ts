import adminModel from "../models/adminModel";
import teacherModel from "../models/teacherModel";

import { IAdminRepository } from "../../../useCases/interface/repository/adminRepository";
import { IAdmin } from "../../../entities/adminEntity";
import { ITeacher } from "../../../entities/teacherEntity";

import {
  findByEmail,
  createTeacher,
  findTeacher,
  getTeachers,
} from "./adminRepository/index";

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
      console.log(admin, "adminrep");
      await adminModel.create(admin);
    } catch (error) {
      console.error("Error creating admin:", error);
      throw new Error("Failed to create admin");
    }
  }

  async createTeacher(teacher: ITeacher): Promise<void> {
    try {
      await createTeacher(teacher);
    } catch (error) {
      console.error("Error creating teacher:", error);
      throw new Error("Failed to create teacher");
    }
  }

  async findTeacher(email: string): Promise<ITeacher | null> {
    try {
      const teacherExist = await findTeacher(email);
      return teacherExist;
    } catch (error) {
      console.error("Error finding teacher by email:", error);
      throw new Error("Failed to find teacher by email");
    }
  }

  async getTeachers(): Promise<ITeacher[]> {
    try {
      const teachers = await getTeachers();
      return teachers;
    } catch (error) {
      throw new Error("Failed to fetch teachers");
    }
  }
}
