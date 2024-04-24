import { Req, Res, Next } from "../frameworks/types/serverPackageTypes";
import { IAdminUseCase } from "../useCases/interface/useCase/adminUseCase";
import { ITeacher } from "../entities/teacherEntity";
import { IStudent } from "../entities/studentEntity";
import { ICourse } from "../entities/courseEntity";
import { randomBytes } from "crypto";
import Role from "../@types/enum/roles";
import ErrorHandler from "../useCases/middlewares/errorHandler";
import { IBatch } from "../entities/batchEntity";
import { IAnnouncement } from "../entities/announcementEntity";
import courseModel from "../frameworks/database/models/courseModel";
import { ITimetable } from "../entities/timeTableEntity";

export class AdminController {
  private readonly adminUseCase: IAdminUseCase;

  constructor(adminUseCase: IAdminUseCase) {
    this.adminUseCase = adminUseCase;
  }

  async login(req: Req, res: Res, next: Next) {
    try {
      const { email, password } = req.body;
      const result = await this.adminUseCase.login(email, password, next);

      res.status(200).json({ result, success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async addTeacher(req: Req, res: Res, next: Next) {
    try {
      const { name, email, subject, gender, batch, batchId } = req.body;

      if (!name || !email || !subject || !gender || !batchId) {
        throw new Error("Please fill in all fields.");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Please enter a valid email address.");
      }
      const password = randomBytes(8).toString("hex");
      const role = Role.TEACHER;
      const newTeacher: ITeacher = {
        name,
        email,
        batch,
        batchId,
        subject,
        gender,
        password,
        role,
      };
      console.log("email :", email, "password : ", password);
      const addedTeacher = await this.adminUseCase.addTeacher(newTeacher, next);
      res.status(201).json({ addedTeacher, success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async getTeachers(req: Req, res: Res, next: Next) {
    try {
      const teachers = await this.adminUseCase.getTeachers(next);
      res.json(teachers);
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async blockTeacher(req: Req, res: Res, next: Next) {
    const teacherId = req.params.id;
    try {
      const isActive = await this.adminUseCase.blockTeacher(teacherId, next);
      res.status(200).json({ isActive, success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async removeTeacher(req: Req, res: Res, next: Next) {
    const teacherId = req.params.id;
    try {
      await this.adminUseCase.removeTeacher(teacherId, next);
      res
        .status(200)
        .json({ message: "Teacher removed successfully", success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async addStudent(req: Req, res: Res, next: Next) {
    try {
      const { name, email, course, batch, gender, batchId } = req.body;

      if (!name || !email || !course || !batch || !gender || !batchId) {
        throw new Error("Please fill in all fields.");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Please enter a valid email address.");
      }

      const password = randomBytes(8).toString("hex");
      const role = Role.STUDENT;
      const newStudent: IStudent = {
        name,
        email,
        course,
        batch,
        batchId,
        gender,
        password,
        role,
      };
      console.log("email :", email, "password : ", password);
      const addedStudent = await this.adminUseCase.addStudent(newStudent, next);
      res.status(201).json({ addedStudent, success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async getStudents(req: Req, res: Res, next: Next) {
    try {
      const students = await this.adminUseCase.getStudents(next);
      res.json(students);
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async blockStudent(req: Req, res: Res, next: Next) {
    const studentId = req.params.id;
    try {
      const isActive = await this.adminUseCase.blockStudent(studentId, next);
      res.status(200).json({ isActive, success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async removeStudent(req: Req, res: Res, next: Next) {
    const studentId = req.params.id;
    try {
      await this.adminUseCase.removeStudent(studentId, next);
      res
        .status(200)
        .json({ message: "Student removed successfully", success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async addCourse(req: Req, res: Res, next: Next) {
    try {
      const { course, subjects } = req.body;

      const existingCourse = await courseModel.findOne({
        course: { $regex: new RegExp(`^${course}$`, "i") },
      });

      if (existingCourse) {
        return res
          .status(400)
          .json({ message: "Course in this name is already added" });
      }
      // Validate input fields
      if (
        !course ||
        !subjects ||
        !Array.isArray(subjects) ||
        subjects.length === 0
      ) {
        throw new Error("Please provide a course and at least one subject.");
      }

      // Ensure each subject is a non-empty string
      for (const subject of subjects) {
        if (typeof subject !== "string" || subject.trim() === "") {
          throw new Error("Invalid subject format.");
        }
      }

      const newCourse: ICourse = { course, subjects };
      const addedCourse = await this.adminUseCase.addCourse(newCourse, next);
      res.status(201).json({ addedCourse, success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async getCourses(req: Req, res: Res, next: Next) {
    try {
      const courses = await this.adminUseCase.getCourses(next);
      res.json(courses);
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async removeCourse(req: Req, res: Res, next: Next) {
    const courseId = req.params.id;
    try {
      await this.adminUseCase.removeCourse(courseId, next);
      res
        .status(200)
        .json({ message: "Course removed successfully", success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async getAdminProfile(req: Req, res: Res, next: Next) {
    try {
      const adminId = req.params.id;
      const admin = await this.adminUseCase.getAdminProfile(adminId);
      if (!admin) {
        res.status(404).json({ error: "Admin not found" });
        return;
      }
      res.status(200).json({ admin, success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async updateAdminProfile(req: Req, res: Res, next: Next) {
    try {
      const adminId = req.params.id;
      const updates = req.body;
      await this.adminUseCase.updateAdminProfile(adminId, updates);
      res.status(200).json({ success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async addBatch(req: Req, res: Res, next: Next) {
    try {
      const { name, students } = req.body;

      // Validate input fields
      if (!name || typeof name !== "string" || !name.trim()) {
        throw new Error("Please provide a valid name.");
      }

      const newBatch: IBatch = { name, students };
      const addedBatch = await this.adminUseCase.addBatch(newBatch, next);
      res.status(201).json({ addedBatch, success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async getBatches(req: Req, res: Res, next: Next) {
    try {
      const batches = await this.adminUseCase.getBatches(next);
      res.json(batches);
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async removeBatch(req: Req, res: Res, next: Next) {
    const batchId = req.params.id;
    try {
      await this.adminUseCase.removeBatch(batchId, next);
      res
        .status(200)
        .json({ message: "Batch removed successfully", success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async addAnnouncement(req: Req, res: Res, next: Next) {
    try {
      const { announcement, date } = req.body;
      const newAnnouncementData: IAnnouncement = {
        announcement,
        date,
      };

      const addedAnnouncement = await this.adminUseCase.addAnnouncement(
        newAnnouncementData,
        next
      );
      res.status(201).json({ addedAnnouncement, success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async getAnnouncements(req: Req, res: Res, next: Next) {
    try {
      const announcements = await this.adminUseCase.getAnnouncements(next);
      res.json(announcements);
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async removeAnnouncement(req: Req, res: Res, next: Next) {
    const announcementId = req.params.id;
    try {
      await this.adminUseCase.removeAnnouncemet(announcementId, next);
      res
        .status(200)
        .json({ message: "Annoucement removed successfully", success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async getTeachersLeaves(req: Req, res: Res, next: Next) {
    try {
      const leaves = await this.adminUseCase.getTeachersLeaves(next);
      res.status(200).json({ leaves, success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async getStudentsLeaves(req: Req, res: Res, next: Next) {
    try {
      const leaves = await this.adminUseCase.getStudentsLeaves(next);
      res.status(200).json({ leaves, success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async updateTeachersLeaveStatus(req: Req, res: Res, next: Next) {
    try {
      const { leaveId, status } = req.body;
      await this.adminUseCase.updateTeacherLeaveStatus(leaveId, status, next);
      res
        .status(200)
        .json({ message: "Leave updated successfully", success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async updateStudentsLeaveStatus(req: Req, res: Res, next: Next) {
    try {
      const { leaveId, status } = req.body;
      await this.adminUseCase.updateStudentsLeaveStatus(leaveId, status, next);
      res
        .status(200)
        .json({ message: "Leave updated successfully", success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }
  async addTimetable(req: Req, res: Res, next: Next) {
    try {
      const { date, batch, period, subject, teacher } = req.body;

      const newTimetable: ITimetable = {
        date,
        batch,
        period,
        subject,
        teacher,
      };

      const addedTimetable = await this.adminUseCase.addTimetable(
        newTimetable,
        next
      );
      res.status(201).json({ addedTimetable, success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async deleteTimetable(req: Req, res: Res, next: Next) {
    try {
      const timetableId = req.params.id;
      await this.adminUseCase.removeTimetable(timetableId, next);
      res
        .status(200)
        .json({ message: "Timetable removed successfully", success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async getTimetables(req: Req, res: Res, next: Next) {
    try {
      const timetables = await this.adminUseCase.getTimetables(next);
      res.status(200).json({ timetables, success: true });
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }
}
