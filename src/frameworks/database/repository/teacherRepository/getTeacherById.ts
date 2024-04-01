import ErrorHandler from "../../../../useCases/middlewares/errorHandler";
import teacherModel from "../../models/teacherModel";

export const getTeacherById = async (teacherId: string) => {
  try {
    const teacher = await teacherModel
      .findById(teacherId)
      .populate({
        path: "batchId",
        populate: {
          path: "students",
          model: "Student",
        },
      })
      .exec();
    if (!teacher) {
      throw new ErrorHandler(404, "Teacher not found");
    }

    return teacher;
  } catch (error) {
    console.error("Error retrieving teacher by ID:", error);
    throw new ErrorHandler(500, "Internal server error");
  }
};
