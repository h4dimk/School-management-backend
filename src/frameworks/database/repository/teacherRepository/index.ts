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
import { findAssignmentbyBatchId } from "./manageAssignment";
import { getBatches } from "./manageBatches";
import { createRemark, findRemarks } from "./manageRemarks";
import { getBatchRanks } from "../commonRepository/manageBatchRanks";

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
  findAssignmentbyBatchId,
  getBatches,
  createRemark,
  findRemarks,
  getBatchRanks
};
