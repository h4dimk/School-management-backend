"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBatchRanks = exports.getAttendance = exports.findRemarks = exports.findAnsweredMCQs = exports.findAssignmentbyStudentId = exports.createAssignment = exports.createMcqSubmit = exports.findbyBatchMcqs = exports.findTimetables = exports.findGroup = exports.createGroup = exports.findChats = exports.createMessage = exports.removeLeave = exports.findLeavebyStudentId = exports.createLeave = exports.getAnnouncements = exports.updateStudent = exports.getStudentById = exports.findByEmail = void 0;
const findByEmail_1 = require("./findByEmail");
Object.defineProperty(exports, "findByEmail", { enumerable: true, get: function () { return findByEmail_1.findByEmail; } });
const getStudentById_1 = require("./getStudentById");
Object.defineProperty(exports, "getStudentById", { enumerable: true, get: function () { return getStudentById_1.getStudentById; } });
const updateStudent_1 = require("./updateStudent");
Object.defineProperty(exports, "updateStudent", { enumerable: true, get: function () { return updateStudent_1.updateStudent; } });
const getAnnouncements_1 = require("./getAnnouncements");
Object.defineProperty(exports, "getAnnouncements", { enumerable: true, get: function () { return getAnnouncements_1.getAnnouncements; } });
const manageLeave_1 = require("./manageLeave");
Object.defineProperty(exports, "createLeave", { enumerable: true, get: function () { return manageLeave_1.createLeave; } });
Object.defineProperty(exports, "findLeavebyStudentId", { enumerable: true, get: function () { return manageLeave_1.findLeavebyStudentId; } });
Object.defineProperty(exports, "removeLeave", { enumerable: true, get: function () { return manageLeave_1.removeLeave; } });
const manageChat_1 = require("../commonRepository/manageChat");
Object.defineProperty(exports, "createMessage", { enumerable: true, get: function () { return manageChat_1.createMessage; } });
Object.defineProperty(exports, "findChats", { enumerable: true, get: function () { return manageChat_1.findChats; } });
const manageGroup_1 = require("../commonRepository/manageGroup");
Object.defineProperty(exports, "createGroup", { enumerable: true, get: function () { return manageGroup_1.createGroup; } });
Object.defineProperty(exports, "findGroup", { enumerable: true, get: function () { return manageGroup_1.findGroup; } });
const manageTimetable_1 = require("./manageTimetable");
Object.defineProperty(exports, "findTimetables", { enumerable: true, get: function () { return manageTimetable_1.findTimetables; } });
const manageMcqs_1 = require("./manageMcqs");
Object.defineProperty(exports, "findbyBatchMcqs", { enumerable: true, get: function () { return manageMcqs_1.findbyBatchMcqs; } });
Object.defineProperty(exports, "createMcqSubmit", { enumerable: true, get: function () { return manageMcqs_1.createMcqSubmit; } });
Object.defineProperty(exports, "findAnsweredMCQs", { enumerable: true, get: function () { return manageMcqs_1.findAnsweredMCQs; } });
const manageAssignment_1 = require("./manageAssignment");
Object.defineProperty(exports, "createAssignment", { enumerable: true, get: function () { return manageAssignment_1.createAssignment; } });
Object.defineProperty(exports, "findAssignmentbyStudentId", { enumerable: true, get: function () { return manageAssignment_1.findAssignmentbyStudentId; } });
const manageRmarks_1 = require("./manageRmarks");
Object.defineProperty(exports, "findRemarks", { enumerable: true, get: function () { return manageRmarks_1.findRemarks; } });
const manageAttendance_1 = require("./manageAttendance");
Object.defineProperty(exports, "getAttendance", { enumerable: true, get: function () { return manageAttendance_1.getAttendance; } });
const manageBatchRanks_1 = require("../commonRepository/manageBatchRanks");
Object.defineProperty(exports, "getBatchRanks", { enumerable: true, get: function () { return manageBatchRanks_1.getBatchRanks; } });
//# sourceMappingURL=index.js.map