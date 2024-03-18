import { Req, Res, Next } from "../frameworks/types/serverPackageTypes";
import { IAdminUseCase } from "../useCases/interface/useCase/adminUseCase";
import { ITeacher } from "../entities/teacherEntity";
import { IStudent } from "../entities/studentEntity";
import { ICourse } from "../entities/courseEntity";
import { randomBytes } from "crypto";
import Role from "../@types/enum/roles";
import ErrorHandler from "../useCases/middlewares/errorHandler";
import { IBatch } from "../entities/batchEntity";

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
      const { name, email, subject, gender } = req.body;
      const password = randomBytes(8).toString("hex");
      const role = Role.TEACHER;
      const newTeacher: ITeacher = {
        name,
        email,
        subject,
        gender,
        password,
        role,
      };
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
      const { name, email, course, batch, gender } = req.body;
      const password = randomBytes(8).toString("hex");
      const role = Role.STUDENT;
      const newStudent: IStudent = {
        name,
        email,
        course,
        batch,
        gender,
        password,
        role,
      };
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
      const updatedAdmin = await this.adminUseCase.updateAdminProfile(
        adminId,
        updates
      );
      return updatedAdmin;
    } catch (error: any) {
      next(new ErrorHandler(500, error.message));
    }
  }

  async addBatch(req: Req, res: Res, next: Next) {
    try {
      const { batch } = req.body;
      const newBatch: IBatch = { batch };
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
}
