import { Req, Res, Next } from "../frameworks/types/serverPackageTypes";

import { IStudent } from "../entities/studentEntity";

import { IStudentUseCase } from "../useCases/interface/useCase/studentUseCase";
import ErrorHandler from "../useCases/middlewares/errorHandler";
import { ILeaveStudent } from "../entities/leaveStudentEntity";
import { IMessage } from "../entities/chatEntity";

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
      const { leaveType, startDate, endDate, reason, studentBatch } = req.body;
      const studentId = req.params.id;

      // Validate input fields
      if (!leaveType || typeof leaveType !== "string" || !leaveType.trim()) {
        throw new Error("Please provide a valid leave type.");
      }

      if (!startDate || !(startDate instanceof Date)) {
        throw new Error("Please provide a valid start date.");
      }

      if (!endDate || !(endDate instanceof Date)) {
        throw new Error("Please provide a valid end date.");
      }

      if (!reason || typeof reason !== "string" || !reason.trim()) {
        throw new Error("Please provide a valid reason for leave.");
      }

      if (
        !studentBatch ||
        typeof studentBatch !== "string" ||
        !studentBatch.trim()
      ) {
        throw new Error("Please provide a valid student batch.");
      }

      if (!studentId || typeof studentId !== "string" || !studentId.trim()) {
        throw new Error("Please provide a valid student ID.");
      }

      const newLeave: ILeaveStudent = {
        leaveType,
        startDate,
        endDate,
        reason,
        studentBatch,
        student: studentId,
      };
      const leave = await this.studentUseCase.applyLeave(newLeave, next);

      res.status(201).json({ leave, success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async getLeaves(req: Req, res: Res, next: Next) {
    try {
      const studentId = req.params.id;

      const leaves = await this.studentUseCase.getLeaves(studentId);

      res.status(201).json({ leaves, success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async cancelLeave(req: Req, res: Res, next: Next) {
    try {
      const leaveId = req.params.id;
      await this.studentUseCase.cancelLeave(leaveId);
      res.status(201).json({ success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async addMessage(req: Req, res: Res, next: Next) {
    try {
      const { message, sender, group } = req.body;
      const newMessage: IMessage = {
        message,
        sender,
        group,
      };
      const createdmessage = await this.studentUseCase.addMessage(newMessage);
      res.status(201).json({ createdmessage, success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async getChats(req: Req, res: Res, next: Next) {
    try {
      const batchId = req.params.id;

      const chats = await this.studentUseCase.getChats(batchId);

      res.status(201).json({ chats, success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async getTimetables(req: Req, res: Res, next: Next) {
    try {
      const batchId = req.params.id;
      const timetables = await this.studentUseCase.getTimetables(batchId, next);
      res.status(200).json({ timetables, success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async getMcqsByBatch(req: Req, res: Res, next: Next) {
    try {
      const batchId = req.params.id;
      const mcqs = await this.studentUseCase.findMcqsByBatch(batchId, next);
      res.status(200).json({ mcqs, success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }
}
