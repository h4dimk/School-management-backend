import { Req, Res, Next } from "../frameworks/types/serverPackageTypes";

import { ITeacher } from "../entities/teacherEntity";

import { ITeacherUseCase } from "../useCases/interface/useCase/teacherUseCase";

export class TeacherController {
  private teacherUseCase: ITeacherUseCase;

  constructor(teacherUseCase: ITeacherUseCase) {
    this.teacherUseCase = teacherUseCase;
  }

  async login(req: Req, res: Res, next: Next) {
    try {
      const { email, password } = req.body;
      const token = await this.teacherUseCase.login(email, password, next);
      return res.status(200).json({ token, success: true });
    } catch (error) {
      return next(error);
    }
  }
}
