import timetableModel from "../../models/timetableModel";

export const findTimetables = async (batchId: string) => {
  try {
    const timetables = await timetableModel
      .find({ batch: batchId })
      .populate("batch").populate("teacher");
    return timetables;
  } catch (error) {
    console.error("Error occurred while fetching timetable:", error);
    throw new Error("Failed to fetch timetable");
  }
};
