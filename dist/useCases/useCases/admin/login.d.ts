import { IAdmin } from "../../../entities/adminEntity";
import { IAdminRepository } from "../../interface/repository/adminRepository";
export declare const login: (adminRepository: IAdminRepository, email: string, password: string) => Promise<{
    admin: IAdmin;
} | void>;
