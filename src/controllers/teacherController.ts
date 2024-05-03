import { Req, Res, Next } from "../frameworks/types/serverPackageTypes";
import { ITeacherUseCase } from "../useCases/interface/useCase/teacherUseCase";
import ErrorHandler from "../useCases/middlewares/errorHandler";
import { IAttendence } from "../entities/attendenceEntity";
import attendenceModel from "../frameworks/database/models/attendenceModel";
import { ILeaveTeacher } from "../entities/leaveTeacherEntity";
import { IMcq } from "../entities/mcqEntity";
import { IMessage } from "../entities/chatEntity";
import { IRemark } from "../entities/remarksEntity";

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

  async getStudentsLeaves(req: Req, res: Res, next: Next) {
    try {
      const batch = req.query.batch as string;
      const leaves = await this.teacherUseCase.getStudentsLeaves(batch, next);
      res.status(200).json({ leaves, success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async updateStudentsLeaveStatus(req: Req, res: Res, next: Next) {
    try {
      const { leaveId, status } = req.body;
      await this.teacherUseCase.updateLeaveStatus(leaveId, status, next);
      res
        .status(200)
        .json({ message: "Leave updated successfully", success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async getTimetables(req: Req, res: Res, next: Next) {
    try {
      const teacherId = req.params.id;
      const timetables = await this.teacherUseCase.getTimetables(
        teacherId,
        next
      );
      res.status(200).json({ timetables, success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async addMcq(req: Req, res: Res, next: Next) {
    try {
      const { batchId, correctAnswer, options, question, teacherId } = req.body;
      if (!batchId || !correctAnswer || !question || !teacherId) {
        return res.status(400).json({ message: "All fields are required" });
      }

      for (const option of options) {
        if (typeof option !== "string" || option.trim() === "") {
          return res
            .status(400)
            .json({ message: "Options should be non-empty" });
        }
      }

      const newMcq: IMcq = {
        batchId,
        correctAnswer,
        options,
        question,
        teacherId,
      };
      const createdMcq = await this.teacherUseCase.addMcq(newMcq, next);
      res.status(200).json({ createdMcq, success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async getMcqsForTeacher(req: Req, res: Res, next: Next) {
    try {
      const teacherId = req.params.id;
      const mcqs = await this.teacherUseCase.findMcqsByTeacher(teacherId, next);
      res.status(200).json({ mcqs, success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async getMcqsByBatch(req: Req, res: Res, next: Next) {
    try {
      const batchId = req.params.id;
      const mcqs = await this.teacherUseCase.findMcqsByBatch(batchId, next);
      res.status(200).json({ mcqs, success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async getAssignmentsBatch(req: Req, res: Res, next: Next) {
    try {
      const batchId = req.params.id;
      const assignments = await this.teacherUseCase.getAssignments(
        batchId,
        next
      );
      res.status(200).json({ assignments, success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  // async addMessage(req: Req, res: Res, next: Next) {
  //   try {
  //     const { message, sender, group } = req.body;
  //     const newMessage: IMessage = {
  //       message,
  //       sender,
  //       group,
  //     };
  //     const createdmessage = await this.teacherUseCase.addMessage(newMessage);
  //     res.status(201).json({ createdmessage, success: true });
  //   } catch (error: any) {
  //     next(new ErrorHandler(500, error.message));
  //   }
  // }

  async getChats(req: Req, res: Res, next: Next) {
    try {
      const batchId = req.params.id;

      const chats = await this.teacherUseCase.getChats(batchId);

      res.status(201).json({ chats, success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async addRemark(req: Req, res: Res, next: Next) {
    try {
      const { batchId, date, remark, subject, teacherId, files } = req.body;
      const newRemark: IRemark = {
        batchId,
        date,
        remark,
        subject,
        teacherId,
        files,
      };

      const addedRemark = await this.teacherUseCase.addRemarks(newRemark);
      res.status(201).json({ addedRemark, success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async getRemarks(req: Req, res: Res, next: Next) {
    try {
      const teacherId = req.params.id;

      const remarks = await this.teacherUseCase.getRemarks(teacherId);
      res.status(201).json({ remarks, success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async getBatches(req: Req, res: Res, next: Next) {
    try {
      const batches = await this.teacherUseCase.getBatches();
      res.status(201).json({ batches, success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }
}
