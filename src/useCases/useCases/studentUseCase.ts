import { IStudentRepository } from "../interface/repository/studentRepository";
import IJwtService from "../interface/services/jwtService";
import { IStudentUseCase } from "../interface/useCase/studentUseCase";
import ErrorHandler from "../middlewares/errorHandler";
import { Next } from "../../frameworks/types/serverPackageTypes";
import { IHashpassword } from "../interface/services/hashPassword";

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
  ): Promise<string | void> {
    try {
      const student = await this.studentRepository.findByEmail(email);

      if (student) {
        const passwordMatch = await this.hashPassword.comparePassword(
          password,
          student.password
        );

        if (passwordMatch && student._id && student.role) {
          const token = this.jwt.createToken({
            _id: student._id,
            role: student.role,
          });
          return token;
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
}
