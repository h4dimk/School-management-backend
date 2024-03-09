import courseModel from "../../models/courseModel";

import { ICourse } from "../../../../entities/courseEntity";

export const createCourse = async (course: ICourse) => {
  try {
    const createdCourse = await courseModel.create(course);
    return createdCourse;
  } catch (error) {
    console.error("Error creating course:", error);
    throw new Error("Failed to create course");
  }
};
