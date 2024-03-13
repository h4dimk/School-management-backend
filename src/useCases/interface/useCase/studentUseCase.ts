export interface IStudentUseCase {
  login(email: string, password: string): Promise<string>;
}
