"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherRepository = void 0;
const index_1 = require("./teacherRepository/index");
class TeacherRepository {
    constructor(teacherModels) {
        this.teacherModels = teacherModels;
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const teacherExist = yield (0, index_1.findByEmail)(email);
                return teacherExist;
            }
            catch (error) {
                console.error("Error occurred while logging in teacher:", error);
                throw new Error("Failed to log in teacher");
            }
        });
    }
    getTeacherById(teacherId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!teacherId) {
                    throw new Error("Teacher ID is required");
                }
                const teacher = yield (0, index_1.getTeacherById)(teacherId);
                return teacher;
            }
            catch (error) {
                throw new Error("Failed to fetch teacher");
            }
        });
    }
    updateTeacher(teacherId, teacher) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!teacherId) {
                    throw new Error("Student ID is required");
                }
                const updatedTeacher = yield (0, index_1.updateTeacher)(teacherId, teacher);
                return updatedTeacher;
            }
            catch (error) {
                throw new Error("Failed to update teacher");
            }
        });
    }
    getAnnouncements() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const announcements = yield (0, index_1.getAnnouncements)();
                return announcements;
            }
            catch (error) {
                throw new Error("Failed to fetch announcements");
            }
        });
    }
    createAttendence(attendence) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdAttendence = yield (0, index_1.createAttendence)(attendence);
                return createdAttendence;
            }
            catch (error) {
                console.error("Error occurred while creating attendence:", error);
                throw new Error("Failed to create attendence ");
            }
        });
    }
    getAttendance(batchId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const attendance = yield (0, index_1.getAttendance)(batchId);
                return attendance;
            }
            catch (error) {
                console.error("Error fetching attendance:", error);
                throw new Error("Failed to fetch attendance");
            }
        });
    }
    createLeave(leaveData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdLeave = yield (0, index_1.createLeave)(leaveData);
                return createdLeave;
            }
            catch (error) {
                console.error("Error occurred while creating Leave:", error);
                throw new Error("Failed to create Leave ");
            }
        });
    }
    findLeaves(teacherId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const leaves = yield (0, index_1.findLeavebyTeacherId)(teacherId);
                return leaves;
            }
            catch (error) {
                console.error("Error finding leaves:", error);
                throw new Error("Failed to find leaves");
            }
        });
    }
    removeLeave(leaveId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, index_1.removeLeave)(leaveId);
            }
            catch (error) {
                console.error("Error removing leave:", error);
                throw new Error("Failed to remove leave. Please try again later.");
            }
        });
    }
    getStudentsLeaves(batch) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const leaves = yield (0, index_1.findStudentsLeaves)(batch);
                return leaves;
            }
            catch (error) {
                console.error("Error fetching leaves:", error);
                throw new Error("Failed to fetch leaves. Please try again later.");
            }
        });
    }
    updateLeaveStatus(leaveId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, index_1.updateLeaveStatus)(leaveId, status);
            }
            catch (error) {
                console.error("Error updating leave:", error);
                throw new Error("Failed to update leave. Please try again later.");
            }
        });
    }
    getTimetables(teacherId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const timetables = yield (0, index_1.findTimetables)(teacherId);
                return timetables;
            }
            catch (error) {
                console.error("Error fetching timetables:", error);
                throw new Error("Failed to fetch timetables. Please try again later.");
            }
        });
    }
    createMcqs(mcqDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdMcq = yield (0, index_1.createMcq)(mcqDetails);
                return createdMcq;
            }
            catch (error) {
                console.error("Error occurred while creating Mcqs:", error);
                throw new Error("Failed to create Mcqs ");
            }
        });
    }
    getMcqsByTeacher(teacherId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mcqs = yield (0, index_1.findbyTeacherMcqs)(teacherId);
                return mcqs;
            }
            catch (error) {
                console.error("Error fetching Mcqs:", error);
                throw new Error("Failed to fetch Mcqs. Please try again later.");
            }
        });
    }
    getMcqsByBatch(batchId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mcqs = yield (0, index_1.findbyBatchMcqs)(batchId);
                return mcqs;
            }
            catch (error) {
                console.error("Error fetching Mcqs:", error);
                throw new Error("Failed to fetch Mcqs. Please try again later.");
            }
        });
    }
    findAssignments(batchId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const assignments = yield (0, index_1.findAssignmentbyBatchId)(batchId);
                return assignments;
            }
            catch (error) {
                console.error("Error occurred while fetching assignments:", error);
                throw new Error("Failed to fetch assignments ");
            }
        });
    }
    addMessage(messageData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdMessage = yield (0, index_1.createMessage)(messageData);
                return createdMessage;
            }
            catch (error) {
                console.error("Error occurred while creating Message:", error);
                throw new Error("Failed to create Message ");
            }
        });
    }
    findChats(batchId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Messages = yield (0, index_1.findChats)(batchId);
                return Messages;
            }
            catch (error) {
                console.error("Error finding leaves:", error);
                throw new Error("Failed to find leaves");
            }
        });
    }
    createRemarks(remark) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdRemark = yield (0, index_1.createRemark)(remark);
                return createdRemark;
            }
            catch (error) {
                console.error("Error creating remark:", error);
                throw new Error("Failed to create remark");
            }
        });
    }
    findRemarks(teacherId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const remarks = yield (0, index_1.findRemarks)(teacherId);
                return remarks;
            }
            catch (error) {
                console.error("Error finding remarks:", error);
                throw new Error("Failed to find remarks");
            }
        });
    }
    findBatches() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const batches = yield (0, index_1.getBatches)();
                return batches;
            }
            catch (error) {
                console.error("Error finding batches:", error);
                throw new Error("Failed to find batches");
            }
        });
    }
    findBatchRanks(batchId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const students = yield (0, index_1.getBatchRanks)(batchId);
                return students;
            }
            catch (error) {
                console.error("Error finding student ranks:", error);
                throw new Error("Failed to find student ranks");
            }
        });
    }
}
exports.TeacherRepository = TeacherRepository;
//# sourceMappingURL=teacherRepository.js.map