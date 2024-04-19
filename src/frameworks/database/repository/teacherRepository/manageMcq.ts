import { IMcq } from "../../../../entities/mcqEntity";
import mcqModel from "../../models/mcqModel";

export const createMcq = async (mcqDetails: IMcq) => {
  try {
    const createdMcq = await mcqModel.create(mcqDetails);
    return createdMcq;
  } catch (error) {
    console.error("Error creating MCQ:", error);
    throw new Error("Failed to create MCQ");
  }
};

export const findbyTeacherMcqs = async (teacherId: string) => {
  try {
    const mcqs = await mcqModel.find({ teacherId });
    return mcqs;
  } catch (error) {
    console.error("Error occurred while fetching Mcqs:", error);
    throw new Error("Failed to fetch Mcqs");
  }
};

export const findbyBatchMcqs = async (batchId: string) => {
  try {
    const mcqs = await mcqModel.find({ batchId });
    return mcqs;
  } catch (error) {
    console.error("Error occurred while fetching Mcqs:", error);
    throw new Error("Failed to fetch Mcqs");
  }
};
