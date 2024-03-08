import studentModel from "../../models/studentModel";

export const getStudents = async () => {
  try {
    const students = await studentModel.find();
    return students;
  } catch (error) {
    console.error("Error occurred while fetching students:", error);
    throw new Error("Failed to fetch students");
  }
};
