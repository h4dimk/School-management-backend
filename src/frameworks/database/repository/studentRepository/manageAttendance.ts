import attendenceModel from "../../models/attendenceModel";

export const getAttendance = async (studentId: string) => {
  try {
    const present = await attendenceModel.find({
      present: studentId,
    });

    const absent = await attendenceModel.find({
      absent: studentId,
    });

    return { present, absent };
  } catch (error) {
    console.error("Error fetching Attendance:", error);
    throw new Error("Failed to fetch Attendance");
  }
};
