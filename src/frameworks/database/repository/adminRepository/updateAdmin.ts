import { IAdmin } from "../../../../entities/adminEntity";
import ErrorHandler from "../../../../useCases/middlewares/errorHandler";
import adminModel from "../../models/adminModel";

export const updateAdmin = async (
  adminId: string,
  updatedAdmin: Partial<IAdmin>
) => {
  try {
    if (!adminId) {
      throw new ErrorHandler(400, "Admin ID is required");
    }

    const admin = await adminModel.findByIdAndUpdate(adminId, updatedAdmin, {
      new: true,
    });

    if (!admin) {
      throw new ErrorHandler(404, "Admin not found");
    }

    return admin;
  } catch (error) {
    console.error("Error updating admin:", error);
    throw new ErrorHandler(500, "Failed to update admin");
  }
};
