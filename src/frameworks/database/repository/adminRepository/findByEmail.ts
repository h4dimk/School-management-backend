import adminModel from "../../models/adminModel";

export const findByEmail = async (email: string) => {
  try {
    const admin = await adminModel.findOne({ email });
    return admin;
  } catch (error) {
    console.error("Error occurred while fetching admin:", error);
    throw new Error("Failed to fetch admin");
  }
};
