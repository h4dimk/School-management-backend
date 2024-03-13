import { Req, Res, Next } from "../frameworks/types/serverPackageTypes";

import { IStudent } from "../entities/studentEntity";
import { IStudentUseCase } from "../useCases/interface/useCase/studentUseCase";

export class StudentController {
  private studentUseCase: IStudentUseCase;

  constructor(studentUseCase: IStudentUseCase) {
    this.studentUseCase = studentUseCase;
  }

  
}
