import { Req, Res, Next } from "../frameworks/types/serverPackageTypes";

import { IStudent } from "../entities/studentEntity";

import { IStudentUseCase } from "../useCases/interface/useCase/studentUseCase";
import ErrorHandler from "../useCases/middlewares/errorHandler";
import { ILeaveStudent } from "../entities/leaveStudentEntity";

export class StudentController {
  private studentUseCase: IStudentUseCase;

  constructor(studentUseCase: IStudentUseCase) {
    this.studentUseCase = studentUseCase;
  }

  async login(req: Req, res: Res, next: Next) {
    try {
      const { email, password } = req.body;
      const result = await this.studentUseCase.login(email, password, next);
      return res.status(200).json({ result, success: true });
    } catch (error) {
      return next(error);
    }
  }

  async getStudentProfile(req: Req, res: Res, next: Next) {
    try {
      const studentId = req.params.id;
      const student = await this.studentUseCase.getStudentProfile(studentId);
      if (!student) {
        res.status(404).json({ error: "Student not found" });
        return;
      }
      res.status(200).json({ student, success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async updateStudentProfile(req: Req, res: Res, next: Next) {
    try {
      const studentId = req.params.id;
      const updates = req.body;
      await this.studentUseCase.updateStudentProfile(studentId, updates);
      res.status(200).json({ success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async getAnnouncements(req: Req, res: Res, next: Next) {
    try {
      const announcements = await this.studentUseCase.getAnnouncements(next);
      res.json(announcements);
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async applyLeave(req: Req, res: Res, next: Next) {
    try {
      const { leaveType, startDate, endDate, reason } = req.body;
      const studentId = req.params.id;

      const newLeave: ILeaveStudent = {
        leaveType,
        startDate,
        endDate,
        reason,
        student: studentId,
      };
      const leave = await this.studentUseCase.applyLeave(newLeave, next);

      res.status(201).json({ leave, success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }
}
