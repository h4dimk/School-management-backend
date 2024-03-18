import { IStudentRepository } from "../interface/repository/studentRepository";
import IJwtService from "../interface/services/jwtService";
import { IStudentUseCase } from "../interface/useCase/studentUseCase";
import ErrorHandler from "../middlewares/errorHandler";
import { Next } from "../../frameworks/types/serverPackageTypes";
import { IHashpassword } from "../interface/services/hashPassword";
import { IStudent } from "../../entities/studentEntity";

export class StudentUseCase implements IStudentUseCase {
  private readonly studentRepository: IStudentRepository;
  private readonly jwt: IJwtService;
  private readonly hashPassword: IHashpassword;

  constructor(
    studentRepository: IStudentRepository,
    jwt: IJwtService,
    hashPassword: IHashpassword
  ) {
    this.studentRepository = studentRepository;
    this.jwt = jwt;
    this.hashPassword = hashPassword;
  }

  async login(
    email: string,
    password: string,
    next: Next
  ): Promise<{ student: IStudent; token: string } | void> {
    try {
      const student = await this.studentRepository.findByEmail(email);

      if (student) {
        const passwordMatch = await this.hashPassword.comparePassword(
          password,
          student.password
        );
        // const passwordMatch= password==student.password
        if (passwordMatch && student._id && student.role) {
          const token = await this.jwt.createToken({
            _id: student._id,
            role: student.role,
          });

          student.password = "";
          return { student, token };
        }
      }
      next(new ErrorHandler(401, "Invalid credentials"));
      return;
    } catch (error) {
      console.error("Error occurred while logging in student:", error);
      next(new ErrorHandler(500, "Failed to log in student"));
      return;
    }
  }

  async getStudentProfile(studentId: string): Promise<IStudent | null> {
    try {
      if (!studentId) {
        throw new Error("Student ID is required");
      }
      const student = await this.studentRepository.getStudentById(studentId);
      return student;
    } catch (error) {
      console.error("Error fetching student profile:", error);
      throw new ErrorHandler(500, "Failed to fetch student profile");
    }
  }

  async updateStudentProfile(
    studentId: string,
    updates: Partial<IStudent>
  ): Promise<IStudent> {
    try {
      if (!studentId) {
        throw new Error("Student ID is required");
      }

      if (updates.password) {
        console.log(updates.password)
        const hashedPassword = await this.hashPassword.createHash(
          updates.password
        );
        updates.password = hashedPassword;
      }

      const updatedStudent = await this.studentRepository.updateStudent(
        studentId,
        updates
      );

      if (!updatedStudent) {
        throw new ErrorHandler(404, "Student not found");
      }

      return updatedStudent;
    } catch (error) {
      console.error("Error updating Student profile:", error);
      throw new ErrorHandler(500, "Failed to update Student profile");
    }
  }
}
