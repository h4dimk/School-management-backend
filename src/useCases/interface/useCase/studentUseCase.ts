import { Next } from "../../../frameworks/types/serverPackageTypes";

export interface IStudentUseCase {
  login(email: string, password: string, next: Next): Promise<string | void>;
}
