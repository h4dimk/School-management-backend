import ErrorHandler from "../../../../useCases/middlewares/errorHandler";
import studentModel from "../../models/studentModel";

export const getStudentById = async (studentId: string) => {
  try {
    const student = await studentModel.findById(studentId);
    if (!student) {
      throw new ErrorHandler(404, "Student not found");
    }

    return student;
  } catch (error) {
    console.error("Error retrieving student by ID:", error);
    throw new ErrorHandler(500, "Internal server error");
  }
};
