import ErrorHandler from "../../../../useCases/middlewares/errorHandler";
import adminModel from "../../models/adminModel";

export const getAdminById = async (adminId: string) => {
  try {
    const admin = await adminModel.findById(adminId);
    if (!admin) {
      throw new ErrorHandler(404, "Admin not found");
    }
    return admin;
  } catch (error) {
    console.error("Error retrieving admin by ID:", error);
    throw new ErrorHandler(500, "Internal server error");
  }
};
