import { IAdmin } from "../../../entities/adminEntity";
import { IAdminRepository } from "../../interface/repository/adminRepository";

export const login = async (
  adminRepository: IAdminRepository,
  email: string,
  password: string
): Promise<{ admin: IAdmin } | void> => {
  try {
    const admin = await adminRepository.findByEmail(email);

    if (admin && admin.password === password) {
      return { admin };
    } else {
      return;
    }
  } catch (error) {
    console.error("Error occurred while logging in admin:", error);
    throw new Error("Failed to log in admin");
  }
};
