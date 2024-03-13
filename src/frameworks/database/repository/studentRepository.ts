import studentModel from "../models/studentModel";

import { IStudentRepository } from "../../../useCases/interface/repository/studentRepository";
import { IStudent } from "../../../entities/studentEntity";

import { findByEmail } from "./studentRepository/index";

export class StudentRepository implements IStudentRepository {
  constructor(private studentModels: typeof studentModel) {}

  async findByEmail(email: string): Promise<IStudent | null> {
    try {
      const studentExist = await findByEmail(email);
      return studentExist;
    } catch (error) {
      console.error("Error occurred while logging in student:", error);
      throw new Error("Failed to log in student");
    }
  }
}
