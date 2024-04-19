import { IMcqSubmission } from "../../../../entities/mcqSubmits";
import mcqModel from "../../models/mcqModel";
import mcqSubmitModel from "../../models/mcqSubmitModel";

export const findbyBatchMcqs = async (batchId: string) => {
  try {
    const mcqs = await mcqModel.find({ batchId });
    return mcqs;
  } catch (error) {
    console.error("Error occurred while fetching Mcqs:", error);
    throw new Error("Failed to fetch Mcqs");
  }
};

export const createMcqSubmit = async (mcqSubmitDetails: IMcqSubmission) => {
  try {
    const createdMcqSubmit = await mcqSubmitModel.create(mcqSubmitDetails);
    return createdMcqSubmit;
  } catch (error) {
    console.error("Error occurred while creating McqsSubmit:", error);
    throw new Error("Failed to creating McqsSubmit");
  }
};
