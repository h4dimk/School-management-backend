import { IAssignment } from "../../../../entities/assignmentEntity";
import ErrorHandler from "../../../../useCases/middlewares/errorHandler";
import assignmentModel from "../../models/assignmentModel";

export const createAssignment = async (assignment: IAssignment) => {
  try {
    const createdAssignment = await assignmentModel.create(assignment);
    return createdAssignment;
  } catch (error) {
    console.error("Error creating Assignment:", error);
    throw new Error("Failed to create Assignment");
  }
};

export const findAssignmentbyStudentId = async (studentId: string) => {
  try {
    const assignments = await assignmentModel.find({ student: studentId });
    return assignments;
  } catch (error) {
    console.error("Error retrieving assignments by student ID:", error);
    throw new ErrorHandler(500, "Internal server error");
  }
};
