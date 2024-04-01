import attendenceModel from "../../models/attendenceModel";

export const getAttendance = async (batchId: string) => {
  try {
    const attendance = await attendenceModel
      .find({ batchId })
      .populate("present")
      .populate("absent");
    return attendance;
  } catch (error) {
    console.error("Error fetching Attendance:", error);
    throw new Error("Failed to fetch Attendance");
  }
};
