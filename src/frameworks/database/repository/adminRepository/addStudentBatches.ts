import { Types } from "mongoose";
import ErrorHandler from "../../../../useCases/middlewares/errorHandler";
import batchModel from "../../models/batchModel";

export const addStudentBatch = async (
  batchId: Types.ObjectId,
  studentId: string
) => {
  try {
    if (!batchId) {
      throw new ErrorHandler(400, "Batch ID is required");
    }

    const updatedBatch = await batchModel.findByIdAndUpdate(
      batchId,
      { $push: { students: studentId } },
      { new: true }
    );

    if (!updatedBatch) {
      throw new ErrorHandler(404, "Batch not found");
    }

    return updatedBatch;
  } catch (error) {
    console.error("Error updating batch:", error);
    throw new ErrorHandler(500, "Failed to update batch");
  }
};
