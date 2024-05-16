import studentModel from "../../models/studentModel";
import teacherModel from "../../models/teacherModel";

export const validateUser = async (email: string) => {

  const existingStudent = await studentModel.findOne({ email });
  if (existingStudent) {
    const message = `A Student in this email already exist`;
    return message;
  }

  const existingTeacher = await teacherModel.findOne({ email });
  if (existingTeacher) {
    const message = `A Teacher in this email already exist`;
    return message;
  }
};
