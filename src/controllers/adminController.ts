import { Req, Res, Next } from "../frameworks/types/serverPackageTypes";

import { IAdminUseCase } from "../useCases/interface/useCase/adminUseCase";

import { ITeacher } from "../entities/teacherEntity";

import { randomBytes } from "crypto";
import { IStudent } from "../entities/studentEntity";
import { ICourse } from "../entities/courseEntity";
import IJwtService from "../useCases/interface/services/jwtService";

export class AdminController {
  private readonly adminUseCase: IAdminUseCase;

  constructor(adminUseCase: IAdminUseCase) {
    this.adminUseCase = adminUseCase;
  }

  async login(req: Req, res: Res, next: Next) {
    try {
      const { email, password } = req.body;
      const token = await this.adminUseCase.login(email, password);
      return res.status(200).json({ token });
    } catch (error) {
      return next(error);
    }
  }

  async createAdmin(req: Req, res: Res, next: Next) {
    try {
      const { email, password } = req.body;
      await this.adminUseCase.createAdmin(email, password);
      return res.status(201).send("Admin created successfully");
    } catch (error) {
      console.error("Error creating admin:", error);
      return next(error);
    }
  }

  async addTeacher(req: Req, res: Res) {
    try {
      const { name, email, subject, gender } = req.body;
      const password = randomBytes(8).toString("hex");
      const role = "teacher";
      const newTeacher: ITeacher = {
        name,
        email,
        subject,
        gender,
        password,
        role,
      };
      const addedTeacher = await this.adminUseCase.addTeacher(newTeacher);
      res.status(201).json(addedTeacher);
    } catch (error) {
      console.error("Error adding teacher:", error);
      res.status(500).json({ error: "Failed to add teacher" });
    }
  }

  async getTeachers(req: Req, res: Res) {
    try {
      const teachers = await this.adminUseCase.getTeachers();
      res.json(teachers);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      res.status(500).json({ error: "Failed to fetch teachers" });
    }
  }

  async blockTeacher(req: Req, res: Res) {
    const teacherId = req.params.id;
    try {
      const isActive = await this.adminUseCase.blockTeacher(teacherId);
      // Respond with a success message and the updated isActive status
      res.status(200).json({ isActive });
    } catch (error) {
      console.error("Error blocking/unblocking teacher:", error);
      res.status(500).json({ error: "Failed to block/unblock teacher" });
    }
  }

  async removeTeacher(req: Req, res: Res) {
    const teacherId = req.params.id;
    try {
      await this.adminUseCase.removeTeacher(teacherId);
      res.status(200).json({ message: "Teacher removed successfully" });
    } catch (error) {
      console.error("Error removing teacher:", error);
      res.status(500).json({ error: "Failed to remove teacher" });
    }
  }

  async addStudent(req: Req, res: Res) {
    try {
      const { name, email, course, batch, gender } = req.body;
      const password = randomBytes(8).toString("hex");
      const role = "student";
      const newStudent: IStudent = {
        name,
        email,
        course,
        batch,
        gender,
        password,
        role,
      };
      const addedStudent = await this.adminUseCase.addStudent(newStudent);
      res.status(201).json(addedStudent);
    } catch (error) {
      console.error("Error adding student:", error);
      res.status(500).json({ error: "Failed to add student" });
    }
  }

  async getStudents(req: Req, res: Res) {
    try {
      const students = await this.adminUseCase.getStudents();
      res.json(students);
    } catch (error) {
      console.error("Error fetching students:", error);
      res.status(500).json({ error: "Failed to fetch students" });
    }
  }

  async blockStudent(req: Req, res: Res) {
    const studentId = req.params.id;
    try {
      const isActive = await this.adminUseCase.blockStudent(studentId);
      // Respond with a success message and the updated isActive status
      res.status(200).json({ isActive });
    } catch (error) {
      console.error("Error blocking/unblocking student:", error);
      res.status(500).json({ error: "Failed to block/unblock student" });
    }
  }

  async removeStudent(req: Req, res: Res) {
    const studentId = req.params.id;
    try {
      await this.adminUseCase.removeStudent(studentId);
      res.status(200).json({ message: "Student removed successfully" });
    } catch (error) {
      console.error("Error removing student:", error);
      res.status(500).json({ error: "Failed to remove student" });
    }
  }

  async addCourse(req: Req, res: Res) {
    try {
      const { course, subjects } = req.body;
      const newCourse: ICourse = {
        course,
        subjects,
      };
      const addedCourse = await this.adminUseCase.addCourse(newCourse);
      res.status(201).json(addedCourse);
    } catch (error) {
      console.error("Error adding course:", error);
      res.status(500).json({ error: "Failed to add course" });
    }
  }

  async getCourses(req: Req, res: Res) {
    try {
      const courses = await this.adminUseCase.getCourses();
      res.json(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({ error: "Failed to fetch courses" });
    }
  }

  async removeCourse(req: Req, res: Res) {
    const courseId = req.params.id;
    try {
      await this.adminUseCase.removeCourse(courseId);
      res.status(200).json({ message: "Course removed successfully" });
    } catch (error) {
      console.error("Error removing course:", error);
      res.status(500).json({ error: "Failed to remove course" });
    }
  }
}
