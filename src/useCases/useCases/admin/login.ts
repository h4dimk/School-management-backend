import { IAdmin } from "../../../entities/adminEntity";
import { IAdminRepository } from "../../interface/repository/adminRepository";

export const login = async (
  adminRepository: IAdminRepository,
  email: string,
  password: string
): Promise<{ admin: IAdmin } | void> => {
  try {
    // Call the method in the admin repository to find the admin by email
    const admin = await adminRepository.findByEmail(email);

    // If admin is found and the password matches, return the admin object
    if (admin && admin.password === password) {
      return { admin };
    } else {
      // If admin is not found or the password doesn't match, return void
      return;
    }
  } catch (error) {
    console.error("Error occurred while logging in admin:", error);
    throw new Error("Failed to log in admin");
  }
};
