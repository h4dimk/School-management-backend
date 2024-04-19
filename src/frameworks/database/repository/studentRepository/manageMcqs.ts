import mcqModel from "../../models/mcqModel";

export const findbyBatchMcqs = async (batchId: string) => {
  try {
    const mcqs = await mcqModel.find({ batchId });
    return mcqs;
  } catch (error) {
    console.error("Error occurred while fetching Mcqs:", error);
    throw new Error("Failed to fetch Mcqs");
  }
};
