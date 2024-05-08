import mongoose from "mongoose";
import mcqSubmitModel from "../../models/mcqSubmitModel";

export const getBatchRanks = async (batchId: string) => {
  try {
    const id = new mongoose.Types.ObjectId(batchId);
    const topPerformingStudents = await mcqSubmitModel.aggregate([
      {
        $match: {
          batchId: id,
          isCorrect: true,
        },
      },
      {
        $group: {
          _id: "$studentId",
          totalCorrect: { $sum: 1 },
        },
      },
      {
        $sort: { totalCorrect: -1 },
      },
      {
        $project: {
          studentDetails: "$_id", 
          totalCorrect: 1, 
          _id: 0,
        },
      },
    ]);

    const studentIds = topPerformingStudents.map(
      (result: any) => result.studentDetails
    );

    const populatedStudents = await mcqSubmitModel.populate(
      topPerformingStudents,
      { path: "studentDetails", model: "Student" }
    );

    return populatedStudents;
  } catch (error) {
    console.error("Error fetching top-performing students:", error);
    throw new Error("Failed to fetch top-performing students");
  }
};
