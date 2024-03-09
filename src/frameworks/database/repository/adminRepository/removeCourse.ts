import courseModel from "../../models/courseModel";

export const removeCourse = async (courseId: string) => {
  try {
    const deletedCourse = await courseModel.findByIdAndDelete(courseId);
    if (!deletedCourse) {
      throw new Error("Course not found");
    }
    return deletedCourse;
  } catch (error) {
    console.error("Error removing course:", error);
    throw new Error("Failed to remove course");
  }
};
