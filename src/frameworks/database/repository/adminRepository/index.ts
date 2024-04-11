import { findByEmail } from "./findByEmail";
import { createTeacher } from "./createTeacher";
import { findTeacher } from "./findTeacher";
import { getTeachers } from "./getTeachers";
import { blockTeacher, removeTeacher } from "./manageTeacher";
import { createStudent } from "./createStudent";
import { findStudent } from "./findStudent";
import { getStudents } from "./getStudents";
import { blockStudent, removeStudent } from "./manageStudents";
import { createCourse } from "./createCourse";
import { findCourse } from "./findCourse";
import { getCourses } from "./getCourses";
import { removeCourse } from "./removeCourse";
import { updateAdmin } from "./updateAdmin";
import { getAdminById } from "./getAdminById";
import { addBatch, getBatches, removeBatch } from "./manageBatch";
import { addStudentBatch } from "./addStudentBatches";
import {
  addAnnouncement,
  removeAnnouncement,
  getAnnouncements,
} from "./manageAnnouncement";
import {
  updateTeachersLeaveStatus,
  updateStudentsLeaveStatus,
  findTeachersLeaves,
  findStudentsLeaves,
} from "./manageLeave";

export {
  findByEmail,
  createTeacher,
  findTeacher,
  getTeachers,
  blockTeacher,
  removeTeacher,
  createStudent,
  findStudent,
  getStudents,
  blockStudent,
  removeStudent,
  createCourse,
  findCourse,
  getCourses,
  removeCourse,
  updateAdmin,
  getAdminById,
  addBatch,
  getBatches,
  removeBatch,
  addStudentBatch,
  addAnnouncement,
  removeAnnouncement,
  getAnnouncements,
  updateTeachersLeaveStatus,
  updateStudentsLeaveStatus,
  findTeachersLeaves,
  findStudentsLeaves,
};
