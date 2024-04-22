import ErrorHandler from "../../../../useCases/middlewares/errorHandler";
import assignmentModel from "../../models/assignmentModel";

export const findAssignmentbyBatchId = async (batchId: string) => {
  try {
    const assignments = await assignmentModel
      .find({ batch: batchId })
      .populate("student");
    return assignments;
  } catch (error) {
    console.error("Error retrieving assignments by student ID:", error);
    throw new ErrorHandler(500, "Internal server error");
  }
};
