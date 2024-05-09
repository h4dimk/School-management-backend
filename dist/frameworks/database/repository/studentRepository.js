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
exports.StudentRepository = void 0;
const index_1 = require("./studentRepository/index");
class StudentRepository {
    constructor(studentModels) {
        this.studentModels = studentModels;
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const studentExist = yield (0, index_1.findByEmail)(email);
                return studentExist;
            }
            catch (error) {
                console.error("Error occurred while logging in student:", error);
                throw new Error("Failed to log instudent");
            }
        });
    }
    getStudentById(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!studentId) {
                    throw new Error("Student ID is required");
                }
                const student = yield (0, index_1.getStudentById)(studentId);
                return student;
            }
            catch (error) {
                throw new Error("Failed to fetch student");
            }
        });
    }
    updateStudent(studentId, student) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!studentId) {
                    throw new Error("Student ID is required");
                }
                const updatedStudent = yield (0, index_1.updateStudent)(studentId, student);
                return updatedStudent;
            }
            catch (error) {
                throw new Error("Failed to update student");
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
    findLeaves(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const leaves = yield (0, index_1.findLeavebyStudentId)(studentId);
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
    getTimetables(batch) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const timetables = yield (0, index_1.findTimetables)(batch);
                return timetables;
            }
            catch (error) {
                console.error("Error fetching timetables:", error);
                throw new Error("Failed to fetch timetables. Please try again later.");
            }
        });
    }
    getMcqsByBatch(batchId, studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mcqs = yield (0, index_1.findbyBatchMcqs)(batchId, studentId);
                return mcqs;
            }
            catch (error) {
                console.error("Error fetching Mcqs:", error);
                throw new Error("Failed to fetch Mcqs. Please try again later.");
            }
        });
    }
    createMcqSubmit(mcqSubmitDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const answer = yield (0, index_1.createMcqSubmit)(mcqSubmitDetails);
                return answer;
            }
            catch (error) {
                console.error("Error occurred while creating answer:", error);
                throw new Error("Failed to create answer ");
            }
        });
    }
    createAssignment(assignment) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdAssignment = yield (0, index_1.createAssignment)(assignment);
                return createdAssignment;
            }
            catch (error) {
                console.error("Error occurred while creating assignment:", error);
                throw new Error("Failed to create assignment ");
            }
        });
    }
    findAssignments(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const assignments = yield (0, index_1.findAssignmentbyStudentId)(studentId);
                return assignments;
            }
            catch (error) {
                console.error("Error occurred while fetching assignments:", error);
                throw new Error("Failed to fetch assignments ");
            }
        });
    }
    findMcqsAnswered(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const answeredMcqs = yield (0, index_1.findAnsweredMCQs)(studentId);
                return answeredMcqs;
            }
            catch (error) {
                console.error("Error occurred while fetching answered MCQs:", error);
                throw new Error("Failed to fetch answered MCQs");
            }
        });
    }
    findRemarks(batchId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const remarks = yield (0, index_1.findRemarks)(batchId);
                return remarks;
            }
            catch (error) {
                console.error("Error finding remarks:", error);
                throw new Error("Failed to find remarks");
            }
        });
    }
    findAttendance(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const attendance = yield (0, index_1.getAttendance)(studentId);
                return attendance;
            }
            catch (error) {
                console.error("Error finding attendance:", error);
                throw new Error("Failed to find attendance");
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
exports.StudentRepository = StudentRepository;
//# sourceMappingURL=studentRepository.js.map