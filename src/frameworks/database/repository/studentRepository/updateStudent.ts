import { IStudent } from "../../../../entities/studentEntity";
import ErrorHandler from "../../../../useCases/middlewares/errorHandler";
import studentModel from "../../models/studentModel";

export const updateStudent = async (
  studentId: string,
  updatedStudent: Partial<IStudent>
) => {
  try {
    if (!studentId) {
      throw new ErrorHandler(400, "Student ID is required");
    }

    const student = await studentModel.findByIdAndUpdate(
      studentId,
      updatedStudent,
      {
        new: true,
      }
    );

    if (!student) {
      throw new ErrorHandler(404, "Student not found");
    }

    return student;
  } catch (error) {
    console.error("Error updating student:", error);
    throw new ErrorHandler(500, "Failed to update student");
  }
};
