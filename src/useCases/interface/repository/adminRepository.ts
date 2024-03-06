import { IAdmin } from "../../../entities/adminEntity";

export interface IAdminRepository {
  findByEmail(email: string): Promise<IAdmin | null>;
  create(admin: IAdmin): Promise<void>;
}
