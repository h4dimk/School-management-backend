import studentModel from "../../models/studentModel";

export const findByEmail = async (email: string) => {
  try {
    const student = await studentModel.findOne({ email });
    return student;
  } catch (error) {
    console.error("Error occurred while fetching student:", error);
    throw new Error("Failed to fetch student");
  }
};
