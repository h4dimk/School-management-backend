import { Req, Next } from "../../../frameworks/types/serverPackageTypes";

export interface IAdminUseCase {
  login(email: string, password: string): Promise<string>;
  createAdmin(email: string, password: string): Promise<void>; 
}
