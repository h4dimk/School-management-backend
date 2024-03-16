import { ITeacher } from "../../../../entities/teacherEntity";
import ErrorHandler from "../../../../useCases/middlewares/errorHandler";
import teacherModel from "../../models/teacherModel";

export const updateTeacher = async (
  teacherId: string,
  updatedTeacher: Partial<ITeacher>
) => {
  try {
    if (!teacherId) {
      throw new ErrorHandler(400, "Teacher ID is required");
    }

    const teacher = await teacherModel.findByIdAndUpdate(
      teacherId,
      updatedTeacher,
      {
        new: true,
      }
    );

    if (!teacher) {
      throw new ErrorHandler(404, "Teacher not found");
    }

    return teacher;
  } catch (error) {
    console.error("Error updating teacher:", error);
    throw new ErrorHandler(500, "Failed to update teacher");
  }
};
