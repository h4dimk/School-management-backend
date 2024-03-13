import { Req, Res, Next } from "../frameworks/types/serverPackageTypes";

import { IStudent } from "../entities/studentEntity";
import { IStudentUseCase } from "../useCases/interface/useCase/studentUseCase";

export class StudentController {
  private studentUseCase: IStudentUseCase;

  constructor(studentUseCase: IStudentUseCase) {
    this.studentUseCase = studentUseCase;
  }

  async login(req: Req, res: Res, next: Next) {
    try {
      const { email, password } = req.body;
      const token = await this.studentUseCase.login(email, password);
      return res.status(200).json({ token });
    } catch (error) {
      return next(error);
    }
  }
}
