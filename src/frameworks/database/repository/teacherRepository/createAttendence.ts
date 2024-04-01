import attendenceModel from "../../models/attendenceModel";

import { IAttendence } from "../../../../entities/attendenceEntity";

export const createAttendence = async (attendence: IAttendence) => {
  try {
    const createdAttendence = await attendenceModel.create(attendence);
    return createdAttendence;
  } catch (error) {
    console.error("Error creating Attendence:", error);
    throw new Error("Failed to create Attendence");
  }
};
