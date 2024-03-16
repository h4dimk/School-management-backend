import studentModel from "../models/studentModel";

import { IStudentRepository } from "../../../useCases/interface/repository/studentRepository";
import { IStudent } from "../../../entities/studentEntity";

import {
  findByEmail,
  getStudentById,
  updateStudent,
} from "./studentRepository/index";

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

  async getStudentById(studentId: string): Promise<IStudent | null> {
    try {
      if (!studentId) {
        throw new Error("Student ID is required");
      }

      const student = await getStudentById(studentId);

      return student;
    } catch (error) {
      throw new Error("Failed to fetch student");
    }
  }

  async updateStudent(
    studentId: string,
    student: Partial<IStudent>
  ): Promise<IStudent> {
    try {
      if (!studentId) {
        throw new Error("Student ID is required");
      }
      const updatedStudent = await updateStudent(studentId, student);
      return updatedStudent;
    } catch (error) {
      throw new Error("Failed to update student");
    }
  }
}
