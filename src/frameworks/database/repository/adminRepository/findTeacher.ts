import teacherModel from "../../models/teacherModel";
export const findTeacher = async (email: string) => {
  try {
    const teacher = await teacherModel.findOne({ email });
    return teacher;
  } catch (error) {
    console.error("Error occurred while fetching teacher:", error);
    throw new Error("Failed to fetch teacher");
  }
};
