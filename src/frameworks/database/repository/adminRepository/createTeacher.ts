import { ITeacher } from "../../../../entities/teacherEntity";
import teacherModel from "../../models/teacherModel";

export const createTeacher = async (teacher: ITeacher) => {
  try {
    const createdTeacher = await teacherModel.create(teacher);
    return createdTeacher;
  } catch (error) {
    console.error("Error creating teacher:", error);
    throw new Error("Failed to create teacher");
  }
};
