import { findByEmail } from "./findByEmail";
import { getStudentById } from "./getStudentById";
import { updateStudent } from "./updateStudent";
import { getAnnouncements } from "./getAnnouncements";
import { createLeave, findLeavebyStudentId, removeLeave } from "./manageLeave";
import { createMessage, findChats } from "../commonRepository/manageChat";
import { createGroup, findGroup } from "../commonRepository/manageGroup";
import { findTimetables } from "./manageTimetable";
import {
  findbyBatchMcqs,
  createMcqSubmit,
  findAnsweredMCQs,
} from "./manageMcqs";
import {
  createAssignment,
  findAssignmentbyStudentId,
} from "./manageAssignment";
import { findRemarks } from "./manageRmarks";
import { getAttendance } from "./manageAttendance";
import { getBatchRanks } from "../commonRepository/manageBatchRanks";


export {
  findByEmail,
  getStudentById,
  updateStudent,
  getAnnouncements,
  createLeave,
  findLeavebyStudentId,
  removeLeave,
  createMessage,
  findChats,
  createGroup,
  findGroup,
  findTimetables,
  findbyBatchMcqs,
  createMcqSubmit,
  createAssignment,
  findAssignmentbyStudentId,
  findAnsweredMCQs,
  findRemarks,
  getAttendance,
  getBatchRanks
};
