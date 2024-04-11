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
};
