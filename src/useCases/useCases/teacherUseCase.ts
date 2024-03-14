import { ITeacherRepository } from "../interface/repository/teacherRepository";
import { ITeacherUseCase } from "../interface/useCase/teacherUseCase";
import { ITeacher } from "../../entities/teacherEntity";
import IJwtService from "../interface/services/jwtService";
import ErrorHandler from "../middlewares/errorHandler";
import { Next } from "../../frameworks/types/serverPackageTypes";
import { IHashpassword } from "../interface/services/hashPassword";

export class TeacherUseCase implements ITeacherUseCase {
  private readonly teacherRepository: ITeacherRepository;
  private readonly jwt: IJwtService;
  private readonly hashedPassword: IHashpassword;

  constructor(
    teacherRepository: ITeacherRepository,
    jwt: IJwtService,
    hashedPassword: IHashpassword
  ) {
    this.teacherRepository = teacherRepository;
    this.jwt = jwt;
    this.hashedPassword = hashedPassword;
  }

  async login(
    email: string,
    password: string,
    next: Next
  ): Promise<string | void> {
    try {
      const teacher = await this.teacherRepository.findByEmail(email);

      if (teacher) {
        const passwordMatch = await this.hashedPassword.comparePassword(
          password,
          teacher.password
        );

        if (passwordMatch && teacher._id && teacher.role) {
          const token = this.jwt.createToken({
            _id: teacher._id,
            role: teacher.role,
          });
          return token;
        }
      }

      next(new ErrorHandler(401, "Invalid credentials"));
      return;
    } catch (error) {
      console.error("Error occurred while logging in teacher:", error);
      next(new ErrorHandler(500, "Failed to log in teacher"));
      return;
    }
  }
}
