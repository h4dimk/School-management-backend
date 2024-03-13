import adminModel from "../models/adminModel";

import { IAdminRepository } from "../../../useCases/interface/repository/adminRepository";
import { IAdmin } from "../../../entities/adminEntity";
import { ITeacher } from "../../../entities/teacherEntity";
import { IStudent } from "../../../entities/studentEntity";

import {
  findByEmail,
  createTeacher,
  findTeacher,
  getTeachers,
  blockTeacher,
  removeTeacher,
  createStudent,
  findStudent,
  getStudents,
  blockStudent,
  removeStudent,
  createCourse,
  findCourse,
  getCourses,
  removeCourse,
} from "./adminRepository/index";
import { ICourse } from "../../../entities/courseEntity";

export class AdminRepository implements IAdminRepository {
  constructor(private adminModels: typeof adminModel) {}

  async findByEmail(email: string): Promise<IAdmin | null> {
    try {
      const adminExist = await findByEmail(email);
      return adminExist;
    } catch (error) {
      console.error("Error occurred while logging in admin:", error);
      throw new Error("Failed to log in admin");
    }
  }

  async createTeacher(teacher: ITeacher): Promise<void> {
    try {
      await createTeacher(teacher);
    } catch (error) {
      console.error("Error creating teacher:", error);
      throw new Error("Failed to create teacher");
    }
  }

  async findTeacher(email: string): Promise<ITeacher | null> {
    try {
      const teacherExist = await findTeacher(email);
      return teacherExist;
    } catch (error) {
      console.error("Error finding teacher by email:", error);
      throw new Error("Failed to find teacher by email");
    }
  }

  async getTeachers(): Promise<ITeacher[]> {
    try {
      const teachers = await getTeachers();
      return teachers;
    } catch (error) {
      throw new Error("Failed to fetch teachers");
    }
  }

  async blockTeacher(teacherId: string): Promise<boolean> {
    try {
      const isActive = await blockTeacher(teacherId);
      return isActive;
    } catch (error) {
      console.error("Error blocking/unblocking teacher:", error);
      throw new Error("Failed to block/unblock teacher");
    }
  }

  async removeTeacher(teacherId: string): Promise<void> {
    try {
      await removeTeacher(teacherId);
    } catch (error) {
      console.error("Error removing teacher:", error);
      throw new Error("Failed to remove teacher");
    }
  }

  async createStudent(student: IStudent): Promise<void> {
    try {
      await createStudent(student);
    } catch (error) {
      console.error("Error creating student:", error);
      throw new Error("Failed to create student");
    }
  }

  async findStudent(email: string): Promise<IStudent | null> {
    try {
      const studentExist = await findStudent(email);
      return studentExist;
    } catch (error) {
      console.error("Error finding student by email:", error);
      throw new Error("Failed to find student by email");
    }
  }

  async getStudents(): Promise<IStudent[]> {
    try {
      const students = await getStudents();
      return students;
    } catch (error) {
      throw new Error("Failed to fetch students");
    }
  }

  async blockStudent(studentId: string): Promise<boolean> {
    try {
      const isActive = await blockStudent(studentId);
      return isActive;
    } catch (error) {
      console.error("Error blocking/unblocking student:", error);
      throw new Error("Failed to block/unblock student");
    }
  }

  async removeStudent(studentId: string): Promise<void> {
    try {
      await removeStudent(studentId);
    } catch (error) {
      console.error("Error removing student:", error);
      throw new Error("Failed to remove student");
    }
  }

  async createCourse(course: ICourse): Promise<void> {
    try {
      await createCourse(course);
    } catch (error) {
      console.error("Error creating course:", error);
      throw new Error("Failed to create course");
    }
  }

  async findCourse(name: string): Promise<ICourse | null> {
    try {
      const courseExist = await findCourse(name);
      return courseExist;
    } catch (error) {
      console.error("Error finding course by name:", error);
      throw new Error("Failed to find course by name");
    }
  }

  async getCourse(): Promise<ICourse[]> {
    try {
      const courses = await getCourses();
      return courses;
    } catch (error) {
      throw new Error("Failed to fetch courses");
    }
  }

  async removeCourse(courseId: string): Promise<void> {
    try {
      await removeCourse(courseId);
    } catch (error) {
      console.error("Error removing course:", error);
      throw new Error("Failed to remove course");
    }
  }
}
