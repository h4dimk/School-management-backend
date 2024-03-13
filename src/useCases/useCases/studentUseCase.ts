import { IStudentRepository } from "../interface/repository/studentRepository";
import IJwtService from "../interface/services/jwtService";
import { IStudentUseCase } from "../interface/useCase/studentUseCase";
import ErrorHandler from "../middlewares/errorHandler";
import { Next } from "../../frameworks/types/serverPackageTypes";

export class StudentUseCase implements IStudentUseCase {
  private readonly studentRepository: IStudentRepository;
  private readonly jwt: IJwtService;

  constructor(studentRepository: IStudentRepository, jwt: IJwtService) {
    this.studentRepository = studentRepository;
    this.jwt = jwt;
  }

  async login(email: string, password: string, next: Next): Promise<string | void> {
    try {
      const student = await this.studentRepository.findByEmail(email);

      if (
        student &&
        student.password === password &&
        student._id &&
        student.role
      ) {
        const token = this.jwt.createToken({
          _id: student._id,
          role: student.role,
        });
        return token;
      } else {
        next(new ErrorHandler(401, "Invalid credentials"));
        return;
      }
    } catch (error) {
      console.error("Error occurred while logging in student:", error);
      next(new ErrorHandler(500, "Failed to log in student"));
      return;
    }
  }
}
