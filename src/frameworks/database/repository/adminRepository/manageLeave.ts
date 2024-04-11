import Leave from "../../../../@types/enum/leave";
import leaveModelTeacher from "../../models/leaveTeacherModel";
import leaveModelStudent from "../../models/leaveStudentModel";

export const findTeachersLeaves = async () => {
  try {
    const leaves = await leaveModelTeacher.find().populate("teacher");
    return leaves;
  } catch (error) {
    console.error("Error fetching teachers leaves:", error);
    throw new Error("Failed to fetch leaves");
  }
};

export const findStudentsLeaves = async () => {
  try {
    const leaves = await leaveModelStudent.find().populate("student");
    return leaves;
  } catch (error) {
    console.error("Error fetching students leaves:", error);
    throw new Error("Failed to fetch leaves");
  }
};

export const updateStudentsLeaveStatus = async (
  leaveId: string,
  status: Leave
) => {
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

export const updateTeachersLeaveStatus = async (
  leaveId: string,
  status: Leave
) => {
  try {
    const leave = await leaveModelTeacher.findById(leaveId);

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
