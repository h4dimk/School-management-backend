import timetableModel from "../../models/timetableModel";

export const findTimetables = async (teacherId: string) => {
  try {
    const timetables = await timetableModel
      .find({ teacher: teacherId })
      .populate("teacher").populate("batch");
    return timetables;
  } catch (error) {
    console.error("Error occurred while fetching timetable:", error);
    throw new Error("Failed to fetch timetable");
  }
};
