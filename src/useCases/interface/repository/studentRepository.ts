import { IStudent } from "../../../entities/studentEntity";

export interface IStudentRepository {
  findByEmail(email: string): Promise<IStudent | null>;
}
