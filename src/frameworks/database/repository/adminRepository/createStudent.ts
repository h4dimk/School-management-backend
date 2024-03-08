import { IStudent } from "../../../../entities/studentEntity";

import studentModel from "../../models/studentModel";

export const createStudent = async (student: IStudent) => {
  try {
    const createdStudent = await studentModel.create(student);
    return createStudent;
  } catch (error) {
    console.error("Error creating student:", error);
    throw new Error("Failed to create student");
  }
};
