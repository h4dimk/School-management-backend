import { ITeacherRepository } from "../interface/repository/teacherRepository";
import { ITeacherUseCase } from "../interface/useCase/teacherUseCase";
import { ITeacher } from "../../entities/teacherEntity";

export class TeacherUseCase implements ITeacherUseCase {
  private teacherRepository: ITeacherRepository;

  constructor(teacherRepository: ITeacherRepository) {
    this.teacherRepository = teacherRepository;
  }
  
}
