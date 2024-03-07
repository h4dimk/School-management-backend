import { ITeacher } from "../../../entities/teacherEntity";

export interface ITeacherRepository {
  findByEmail(email: string): Promise<ITeacher | null>;
}
