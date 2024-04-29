import { ICourse } from "../../../../entities/courseEntity";
import ErrorHandler from "../../../../useCases/middlewares/errorHandler";
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

export const upadateCourse = async (
  courseId: string,
  updatedCourse: Partial<ICourse>
) => {
  try {
    if (!courseId) {
      throw new ErrorHandler(400, "Course ID is required");
    }
    const editedCourse = await courseModel.findByIdAndUpdate(
      courseId,
      updatedCourse,
      { new: true }
    );
    return editedCourse;
  } catch (error) {
    console.error("Error updating Course:", error);
    throw new ErrorHandler(500, "Failed to update Course");
  }
};
