import { IAttendence } from "../../../../entities/attendenceEntity";
import attendenceModel from "../../models/attendenceModel";

export const getAttendence = async (): Promise<{
  present: string[];
  absent: string[];
}> => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the beginning of the day

    // Find all attendance records for today
    const attendanceRecords: IAttendence[] = await attendenceModel.find({
      date: { $gte: today }, // Find records with date greater than or equal to today
    });

    // Initialize arrays to store present and absent students
    const allPresent: string[] = [];
    const allAbsent: string[] = [];

    // Iterate through each attendance record
    attendanceRecords.forEach((attendance) => {
      // Convert Types.ObjectId[] to string[] for present and absent students
      const present: string[] = attendance.present.map((id) => id.toString());
      const absent: string[] = attendance.absent.map((id) => id.toString());

      // Concatenate present and absent students from all attendance records
      allPresent.push(...present);
      allAbsent.push(...absent);
    });

    return { present: allPresent, absent: allAbsent };
  } catch (error) {
    console.error("Error fetching attendance:", error);
    throw new Error("Failed to fetch attendance");
  }
};
