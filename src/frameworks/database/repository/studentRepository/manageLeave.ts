import { ILeaveStudent } from "../../../../entities/leaveStudentEntity";
import ErrorHandler from "../../../../useCases/middlewares/errorHandler";
import leaveModel from "../../models/leaveStudentModel";

export const createLeave = async (leaveData: ILeaveStudent) => {
  try {
    const createdLeave = await leaveModel.create(leaveData);
    return createdLeave;
  } catch (error) {
    console.error("Error creating Leave:", error);
    throw new Error("Failed to create Leave");
  }
};

export const findLeavebyStudentId = async (studentId: string) => {
  try {
    const leaves = await leaveModel.find({ student: studentId });
    return leaves;
  } catch (error) {
    console.error("Error retrieving leaves by student ID:", error);
    throw new ErrorHandler(500, "Internal server error");
  }
};

export const removeLeave = async (leaveId: string) => {
  try {
    const removedLeave = await leaveModel.findByIdAndDelete(leaveId);
    if (!removedLeave) {
      throw new Error("Leave not found");
    }
    return removedLeave;
  } catch (error) {
    console.error("Error removing leave:", error);
    throw new Error("Failed to remove leave");
  }
};
