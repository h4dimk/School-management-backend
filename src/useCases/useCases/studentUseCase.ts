import { IStudentRepository } from "../interface/repository/studentRepository";
import { IStudentUseCase } from "../interface/useCase/studentUseCase";

export class StudentUseCase implements IStudentUseCase {
  private readonly studentRepository: IStudentRepository;

  constructor(studentRepository: IStudentRepository) {
    this.studentRepository = studentRepository;
  }
}
