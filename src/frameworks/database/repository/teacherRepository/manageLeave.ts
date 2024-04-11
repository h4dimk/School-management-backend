import Leave from "../../../../@types/enum/leave";
import { ILeaveTeacher } from "../../../../entities/leaveTeacherEntity";
import ErrorHandler from "../../../../useCases/middlewares/errorHandler";
import leaveModelStudent from "../../models/leaveStudentModel";
import leaveModelTeacher from "../../models/leaveTeacherModel";

export const createLeave = async (leaveData: ILeaveTeacher) => {
  try {
    const createdLeave = await leaveModelTeacher.create(leaveData);
    return createdLeave;
  } catch (error) {
    console.error("Error creating Leave:", error);
    throw new Error("Failed to create Leave");
  }
};

export const findLeavebyTeacherId = async (teacherId: string) => {
  try {
    const leaves = await leaveModelTeacher.find({ teacher: teacherId });
    return leaves;
  } catch (error) {
    console.error("Error retrieving leaves by teacher ID:", error);
    throw new ErrorHandler(500, "Internal server error");
  }
};

export const removeLeave = async (leaveId: string) => {
  try {
    const removedLeave = await leaveModelTeacher.findByIdAndDelete(leaveId);
    if (!removedLeave) {
      throw new Error("Leave not found");
    }
    return removedLeave;
  } catch (error) {
    console.error("Error removing leave:", error);
    throw new Error("Failed to remove leave");
  }
};

export const findStudentsLeaves = async (batch: string) => {
  try {
    const leaves = await leaveModelStudent
      .find({ studentBatch: batch })
      .populate("student");
    return leaves;
  } catch (error) {
    console.error("Error fetching studensts leaves:", error);
    throw new Error("Failed to fetch leaves");
  }
};

export const updateLeaveStatus = async (leaveId: string, status: Leave) => {
  try {
    const leave = await leaveModelStudent.findById(leaveId);

    if (!leave) {
      throw new Error("Leave not found");
    }

    leave.status = status;

    await leave.save();
  } catch (error) {
    console.error("Error updating leave status:", error);
    throw new Error("Failed to update leave");
  }
};
