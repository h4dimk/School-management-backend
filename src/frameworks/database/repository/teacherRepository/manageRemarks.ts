import { IRemark } from "../../../../entities/remarksEntity";
import remarkModel from "../../models/remarkModel";

export const createRemark = async (remark: IRemark) => {
  try {
    const createdRemark = await remarkModel.create(remark);
    return createdRemark;
  } catch (error) {
    console.error("Error creating remark:", error);
    throw new Error("Failed to create remark");
  }
};

export const findRemarks = async (teacherId: string) => {
  try {
    const remarks = remarkModel.find({ teacherId });
    return remarks;
  } catch (error) {
    console.error("Error finding Remarks:", error);
    throw new Error("Failed to find Remarks");
  }
};
