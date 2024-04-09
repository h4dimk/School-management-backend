import { Req, Res, Next } from "../frameworks/types/serverPackageTypes";

import { ITeacher } from "../entities/teacherEntity";

import { ITeacherUseCase } from "../useCases/interface/useCase/teacherUseCase";
import ErrorHandler from "../useCases/middlewares/errorHandler";
import { IAttendence } from "../entities/attendenceEntity";
import attendenceModel from "../frameworks/database/models/attendenceModel";
import { ILeaveTeacher } from "../entities/leaveTeacherEntity";

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
      await this.teacherUseCase.updateTeacherProfile(teacherId, updates);
      res.status(200).json({ success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async getAnnouncements(req: Req, res: Res, next: Next) {
    try {
      const announcements = await this.teacherUseCase.getAnnouncements(next);
      res.json(announcements);
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async uploadAttendance(req: Req, res: Res, next: Next) {
    try {
      const { batchId, present, absent, date } = req.body;

      if (!batchId || !present || !absent || !date) {
        throw new ErrorHandler(
          400,
          "Batch ID, present students,date, and absent students are required"
        );
      }

      const existingAttendance = await attendenceModel.findOne({
        batchId,
        date: { $gte: new Date().setHours(0, 0, 0, 0) },
      });

      if (existingAttendance) {
        return res
          .status(400)
          .json({ message: "Attendance already taken for today." });
      }

      const newAttendence: IAttendence = {
        batchId,
        present,
        absent,
        date,
      };

      const attendance = await this.teacherUseCase.addAttendance(
        newAttendence,
        next
      );

      res.status(201).json({ attendance, success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async getAttendance(req: Req, res: Res, next: Next) {
    const batchId = req.params.id;
    try {
      const attendance = await this.teacherUseCase.getAttendance(batchId, next);

      res.status(200).json({ attendance });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async applyLeave(req: Req, res: Res, next: Next) {
    try {
      const { leaveType, startDate, endDate, reason } = req.body;
      const teacherId = req.params.id;

      const newLeave: ILeaveTeacher = {
        leaveType,
        startDate,
        endDate,
        reason,
        teacher: teacherId,
      };
      const leave = await this.teacherUseCase.applyLeave(newLeave, next);

      res.status(201).json({ leave, success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async getLeaves(req: Req, res: Res, next: Next) {
    try {
      const teacherId = req.params.id;

      const leaves = await this.teacherUseCase.getLeaves(teacherId);

      res.status(201).json({ leaves, success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async cancelLeave(req: Req, res: Res, next: Next) {
    try {
      const leaveId = req.params.id;
      await this.teacherUseCase.cancelLeave(leaveId);
      res.status(201).json({ success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }
}
