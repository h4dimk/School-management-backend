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

// Validations

export const validateTimetableDate = async (date: Date) => {
  const currentDate = new Date();
  if (new Date(date) < currentDate) {
    const message = "The date cannot be in the past.";
    return message;
  }
};

export const existingTimetable = async (
  period: number,
  date: Date,
  batch: string
) => {
  const existingTimetable = await timetableModel.findOne({
    period,
    date,
    batch,
  });

  if (existingTimetable) {
    const message = `A timetable with this period and date already exists for this batch`;
    return message;
  }
};

export const alreadyAssignedTeacher = async (
  period: number,
  date: Date,
  teacher: string
) => {
  const alreadyAssignedTeacher = await timetableModel.findOne({
    period,
    date,
    teacher,
  });
  if (alreadyAssignedTeacher) {
    const message = `The teacher is already scheduled for a batch during this period. Please choose a different period or teacher.`;
    return message;
  }
};
