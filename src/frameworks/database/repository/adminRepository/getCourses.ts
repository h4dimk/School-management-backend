import courseModel from "../../models/courseModel";

export const getCourses = async () => {
  try {
    const courses = await courseModel.find();
    return courses;
  } catch (error) {
    console.error("Error occurred while fetching courses:", error);
    throw new Error("Failed to fetch courses");
  }
};
