import { ILeaveStudent } from "../../../../entities/leaveStudentEntity";
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
