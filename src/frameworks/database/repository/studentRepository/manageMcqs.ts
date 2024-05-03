import { IMcqSubmission } from "../../../../entities/mcqSubmits";
import mcqModel from "../../models/mcqModel";
import mcqSubmitModel from "../../models/mcqSubmitModel";

export const findbyBatchMcqs = async (batchId: string, studentId: string) => {
  try {
    const mcqs = await mcqModel.find({ batchId });

    const mcqSubmissions = await mcqSubmitModel.find({
      studentId,
      mcqId: { $in: mcqs.map((mcq) => mcq._id) },
    });

    const remainingMcqs = mcqs.filter(
      (mcq) =>
        !mcqSubmissions.some((submission) => submission.mcqId.equals(mcq._id))
    );

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

export const findAnsweredMCQs = async (studentId: string) => {
  try {
    const mcqSubmissions = await mcqSubmitModel.find({ studentId }).populate('mcqId');

    // const answeredMcqIds = mcqSubmissions.map((submission) => submission.mcqId);

    // const answeredMcqs = await mcqModel.find({ _id: { $in: answeredMcqIds } });

    return mcqSubmissions;
  } catch (error) {
    console.error("Error occurred while fetching answered MCQs:", error);
    throw new Error("Failed to fetch answered MCQs");
  }
};
