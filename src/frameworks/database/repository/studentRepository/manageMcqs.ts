import { IMcqSubmission } from "../../../../entities/mcqSubmits";
import mcqModel from "../../models/mcqModel";
import mcqSubmitModel from "../../models/mcqSubmitModel";

export const findbyBatchMcqs = async (batchId: string, studentId: string) => {
  try {
    // Find all mcqs for the batch
    const mcqs = await mcqModel.find({ batchId });

    
    // Find mcq submissions for the student
    const mcqSubmissions = await mcqSubmitModel.find({
      studentId,
      mcqId: { $in: mcqs.map(mcq => mcq._id) }
    });

    // Filter out the mcqs that have already been submitted by the student
    const remainingMcqs = mcqs.filter(mcq => !mcqSubmissions.some(submission => submission.mcqId.equals(mcq._id)));

    return remainingMcqs;
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
