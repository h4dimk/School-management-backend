import teacherModel from "../models/teacherModel";

import { ITeacherRepository } from "../../../useCases/interface/repository/teacherRepository";
import { ITeacher } from "../../../entities/teacherEntity";

import { findByEmail } from "./teacherRepository/index";

export class TeacherRepository implements ITeacherRepository {
  constructor(private teacherModels: typeof teacherModel) {}


  async findByEmail(email: string): Promise<ITeacher| null> {
    try {
      const teacherExist = await findByEmail(email);
      return teacherExist;
    } catch (error) {
      console.error("Error occurred while logging in admin:", error);
      throw new Error("Failed to log in admin");
    }
  }
  
}
