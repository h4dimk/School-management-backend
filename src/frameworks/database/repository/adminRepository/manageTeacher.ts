import teacherModel from "../../models/teacherModel";

export const blockTeacher = async (teacherId: string) => {
  try {
    const teacher = await teacherModel.findById(teacherId);
    if (!teacher) {
      throw new Error("Teacher not found");
    }
    teacher.isActive = !teacher.isActive;
    await teacher.save();
    return teacher.isActive;
  } catch (error) {
    console.error("Error blocking teacher:", error);
    throw new Error("Failed to block teacher");
  }
};

export const removeTeacher = async (teacherId: string) => {
  try {
    const deletedTeacher = await teacherModel.findByIdAndDelete(teacherId);
    if (!deletedTeacher) {
      throw new Error("Teacher not found");
    }
    return deletedTeacher;
  } catch (error) {
    console.error("Error removing teacher:", error);
    throw new Error("Failed to remove teacher");
  }
};
