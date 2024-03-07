import { Req, Res, Next } from "../frameworks/types/serverPackageTypes";
import { ITeacher } from "../entities/teacherEntity";

import { ITeacherUseCase } from "../useCases/interface/useCase/teacherUseCase";

export class TeacherController {
  private teacherUseCase: ITeacherUseCase;

  constructor(teacherUseCase: ITeacherUseCase) {
    this.teacherUseCase = teacherUseCase;
  }

  
}
