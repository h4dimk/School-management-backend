import { ITeacher } from "../../../entities/teacherEntity";

export interface ITeacherRepository {
  findByEmail(email: string): Promise<ITeacher | null>;

  getTeacherById(teacherId: string): Promise<ITeacher | null>;

  updateTeacher(
    teacherId: string,
    teacher: Partial<ITeacher>
  ): Promise<ITeacher>;
}
