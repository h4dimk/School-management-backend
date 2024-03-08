import studentModel from "../../models/studentModel";

export const blockStudent = async (studentId: string) => {
  try {
    const student = await studentModel.findById(studentId);
    if (!student) {
      throw new Error("Teacher not found");
    }
    student.isActive = !student.isActive;
    await student.save();
    return student.isActive;
  } catch (error) {
    console.error("Error blocking student:", error);
    throw new Error("Failed to block student");
  }
};

export const removeStudent = async (studentId: string) => {
  try {
    const deletedStudent = await studentModel.findByIdAndDelete(studentId);
    if (!deletedStudent) {
      throw new Error("Teacher not found");
    }
    return deletedStudent;
  } catch (error) {
    console.error("Error removing student:", error);
    throw new Error("Failed to remove student");
  }
};
