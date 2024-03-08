import teacherModel from "../../models/teacherModel";

export const getTeachers = async () => {
  try {
    const teachers = await teacherModel.find();
    return teachers;
  } catch (error) {
    console.error("Error occurred while fetching teacher:", error);
    throw new Error("Failed to fetch teacher");
  }
};
