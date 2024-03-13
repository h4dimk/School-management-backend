import { IStudentRepository } from "../interface/repository/studentRepository";
import IJwtService from "../interface/services/jwtService";
import { IStudentUseCase } from "../interface/useCase/studentUseCase";

export class StudentUseCase implements IStudentUseCase {
  private readonly studentRepository: IStudentRepository;
  private readonly jwt: IJwtService;

  constructor(studentRepository: IStudentRepository, jwt: IJwtService) {
    this.studentRepository = studentRepository;
    this.jwt = jwt;
  }

  async login(email: string, password: string): Promise<string> {
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
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      console.error("Error occurred while logging in student:", error);
      throw new Error("Failed to log in student");
    }
  }
}
