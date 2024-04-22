import { IBatch } from "../../../../entities/batchEntity";
import batchModel from "../../models/batchModel";

export const getBatches = async () => {
  try {
    const batches = await batchModel.find().populate("students");
    return batches;
  } catch (error) {
    console.error("Error occurred while fetching batches:", error);
    throw new Error("Failed to fetch batches");
  }
};

export const addBatch = async (batch: IBatch) => {
  try {
    const createdBatch = await batchModel.create(batch);
    return createdBatch;
  } catch (error) {
    console.error("Error creating batch:", error);
    throw new Error("Failed to create batch");
  }
};

export const removeBatch = async (batchId: string) => {
  try {
    const deletedBatch = await batchModel.findByIdAndDelete(batchId);

    if (!deletedBatch) {
      throw new Error("Batch not found");
    }

    return deletedBatch;
  } catch (error) {
    console.error("Error removing batch:", error);
    throw new Error("Failed to remove batch");
  }
};
