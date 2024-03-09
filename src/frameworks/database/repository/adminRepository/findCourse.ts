import courseModel from "../../models/courseModel";

import { ICourse } from "../../../../entities/courseEntity";

export const findCourse = async (name: string) => {
  try {
    const course = await courseModel.findOne({ name });
    return course;
  } catch (error) {
    console.error("Error occurred while fetching course:", error);
    throw new Error("Failed to fetch course");
  }
};
