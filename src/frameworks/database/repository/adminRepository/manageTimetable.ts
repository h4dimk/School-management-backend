import { ITimetable } from "../../../../entities/timeTableEntity";
import timetableModel from "../../models/timetableModel";

export const createTimetable = async (timetable: ITimetable) => {
  try {
    const createdTimetable = await timetableModel.create(timetable);
    return createdTimetable;
  } catch (error) {
    console.error("Error creating timetable:", error);
    throw new Error("Failed to create timetable");
  }
};

export const deleteTimetable = async (timetableId: string) => {
  try {
    const deletedTimetable = await timetableModel.findByIdAndDelete(
      timetableId
    );
    if (!deletedTimetable) {
      throw new Error("timetable not found");
    }
    return deletedTimetable;
  } catch (error) {
    console.error("Error removing timetable:", error);
    throw new Error("Failed to remove timetable");
  }
};

export const findTimetables = async () => {
  try {
    const timetables = await timetableModel
      .find()
      .populate("batch")
      .populate("teacher");
    return timetables;
  } catch (error) {
    console.error("Error occurred while fetching timetable:", error);
    throw new Error("Failed to fetch timetable");
  }
};
