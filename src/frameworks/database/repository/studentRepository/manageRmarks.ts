import remarkModel from "../../models/remarkModel";

export const findRemarks = async (batchId: string) => {
  try {
    const remarks = remarkModel.find({ batchId });
    return remarks;
  } catch (error) {
    console.error("Error finding Remarks:", error);
    throw new Error("Failed to find Remarks");
  }
};
