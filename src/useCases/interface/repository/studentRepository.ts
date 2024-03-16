import { IStudent } from "../../../entities/studentEntity";

export interface IStudentRepository {
  findByEmail(email: string): Promise<IStudent | null>;

  getStudentById(studentId: string): Promise<IStudent | null>;

  updateStudent(
    studentId: string,
    student: Partial<IStudent>
  ): Promise<IStudent>;
}
