import { Req, Res, Next } from "../frameworks/types/serverPackageTypes";

import { ITeacher } from "../entities/teacherEntity";

import { ITeacherUseCase } from "../useCases/interface/useCase/teacherUseCase";
import ErrorHandler from "../useCases/middlewares/errorHandler";

export class TeacherController {
  private teacherUseCase: ITeacherUseCase;

  constructor(teacherUseCase: ITeacherUseCase) {
    this.teacherUseCase = teacherUseCase;
  }

  async login(req: Req, res: Res, next: Next) {
    try {
      const { email, password } = req.body;
      const result = await this.teacherUseCase.login(email, password, next);
      return res.status(200).json({ result, success: true });
    } catch (error) {
      return next(error);
    }
  }

  async getTeacherProfile(req: Req, res: Res, next: Next) {
    try {
      const teacherId = req.params.id;
      const teacher = await this.teacherUseCase.getTeacherProfile(teacherId);
      if (!teacher) {
        res.status(404).json({ error: "Teacher not found" });
        return;
      }
      res.status(200).json({ teacher, success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async updateTeacherProfile(req: Req, res: Res, next: Next) {
    try {
      const teacherId = req.params.id;
      const updates = req.body;
      console.log(updates)
      const updatedTeacher = await this.teacherUseCase.updateTeacherProfile(
        teacherId,
        updates
      );
      return updatedTeacher;
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }
}
