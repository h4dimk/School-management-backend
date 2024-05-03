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
