import { Next } from "../../../frameworks/types/serverPackageTypes";

export interface ITeacherUseCase {
  login(email: string, password: string, next: Next): Promise<string | void>;
}
