import { findByEmail } from "./findByEmail";
import { getTeacherById } from "./getTeacherById";
import { updateTeacher } from "./updateTeacher";
import { getAnnouncements } from "./getAnnouncements";
import { createAttendence } from "./createAttendence";
import { getAttendance } from "./getAttendanceDetails";
import {
  createLeave,
  findLeavebyTeacherId,
  removeLeave,
  updateLeaveStatus,
  findStudentsLeaves,
} from "./manageLeave";
import { createMessage, findChats } from "../commonRepository/manageChat";
import { findTimetables } from "./manageTimetable";
import { findbyBatchMcqs, createMcq, findbyTeacherMcqs } from "./manageMcq";

export {
  findByEmail,
  getTeacherById,
  updateTeacher,
  getAnnouncements,
  createAttendence,
  getAttendance,
  createLeave,
  findLeavebyTeacherId,
  removeLeave,
  updateLeaveStatus,
  findStudentsLeaves,
  createMessage,
  findChats,
  findTimetables,
  findbyBatchMcqs,
  createMcq,
  findbyTeacherMcqs,
};
