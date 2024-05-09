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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentUseCase = void 0;
const errorHandler_1 = __importDefault(require("../middlewares/errorHandler"));
class StudentUseCase {
    constructor(studentRepository, jwt, hashPassword) {
        this.studentRepository = studentRepository;
        this.jwt = jwt;
        this.hashPassword = hashPassword;
    }
    login(email, password, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const student = yield this.studentRepository.findByEmail(email);
                if (student) {
                    const passwordMatch = yield this.hashPassword.comparePassword(password, student.password);
                    // const passwordMatch= password==student.password
                    if (passwordMatch && student._id && student.role) {
                        const token = yield this.jwt.createToken({
                            _id: student._id,
                            role: student.role,
                            // isActive:student.isActive
                        });
                        student.password = "";
                        return { student, token };
                    }
                }
                next(new errorHandler_1.default(401, "Invalid credentials"));
                return;
            }
            catch (error) {
                console.error("Error occurred while logging in student:", error);
                next(new errorHandler_1.default(500, "Failed to log in student"));
                return;
            }
        });
    }
    getStudentProfile(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!studentId) {
                    throw new Error("Student ID is required");
                }
                const student = yield this.studentRepository.getStudentById(studentId);
                return student;
            }
            catch (error) {
                console.error("Error fetching student profile:", error);
                throw new errorHandler_1.default(500, "Failed to fetch student profile");
            }
        });
    }
    updateStudentProfile(studentId, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!studentId) {
                    throw new Error("Student ID is required");
                }
                if (updates.password) {
                    console.log(updates.password);
                    const hashedPassword = yield this.hashPassword.createHash(updates.password);
                    updates.password = hashedPassword;
                }
                const updatedStudent = yield this.studentRepository.updateStudent(studentId, updates);
                if (!updatedStudent) {
                    throw new errorHandler_1.default(404, "Student not found");
                }
                return updatedStudent;
            }
            catch (error) {
                console.error("Error updating Student profile:", error);
                throw new errorHandler_1.default(500, "Failed to update Student profile");
            }
        });
    }
    getAnnouncements(next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const announcements = yield this.studentRepository.getAnnouncements();
                return announcements;
            }
            catch (error) {
                console.error("Error fetching announcements:", error);
                next(new errorHandler_1.default(500, "Failed to fetch announcements"));
                return [];
            }
        });
    }
    applyLeave(leaveData, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdLeave = yield this.studentRepository.createLeave(leaveData);
                return createdLeave;
            }
            catch (error) {
                console.error("Error adding Leave Application:", error);
                next(new errorHandler_1.default(500, "Failed to add Leave Application"));
            }
        });
    }
    getLeaves(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const leaves = yield this.studentRepository.findLeaves(studentId);
                return leaves;
            }
            catch (error) {
                console.error("Error getting leaves:", error);
                throw new Error("Failed to get leaves");
            }
        });
    }
    cancelLeave(leaveId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.studentRepository.removeLeave(leaveId);
            }
            catch (error) {
                console.error("Error canceling leave:", error);
                throw new Error("Failed to cancel leave. Please try again later.");
            }
        });
    }
    addMessage(messageData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const message = yield this.studentRepository.addMessage(messageData);
                return message;
            }
            catch (error) {
                console.error("Error adding message:", error);
                throw new Error("Failed to add message. Please try again later.");
            }
        });
    }
    getChats(batchId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chats = yield this.studentRepository.findChats(batchId);
                return chats;
            }
            catch (error) {
                console.error("Error getting chats:", error);
                throw new Error("Failed to get chats");
            }
        });
    }
    getTimetables(batch, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const timetables = yield this.studentRepository.getTimetables(batch);
                return timetables;
            }
            catch (error) {
                console.error("Error fetching timetables:", error);
                next(new errorHandler_1.default(500, "Failed to fetch timetables"));
                return [];
            }
        });
    }
    findMcqsByBatch(batchId, studentId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mcqs = yield this.studentRepository.getMcqsByBatch(batchId, studentId);
                return mcqs;
            }
            catch (error) {
                console.error("Error fetching Mcqs:", error);
                next(new errorHandler_1.default(500, "Failed to fetch Mcqs. Please try again later."));
                return [];
            }
        });
    }
    submitAnswer(answer, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.studentRepository.createMcqSubmit(answer);
            }
            catch (error) {
                console.error("Error submiting Answer:", error);
                next(new errorHandler_1.default(500, "Failed to submit Answer"));
            }
        });
    }
    addAssignment(assignment, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.studentRepository.createAssignment(assignment);
            }
            catch (error) {
                console.error("Error occurred while add assignment:", error);
                next(new errorHandler_1.default(500, "Failed to add Assignment"));
            }
        });
    }
    getAssignments(studentId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const assignments = yield this.studentRepository.findAssignments(studentId);
                return assignments;
            }
            catch (error) {
                console.error("Error occurred while fetching assignments:", error);
                next(new errorHandler_1.default(500, "Failed to fetch Assignment"));
                return [];
            }
        });
    }
    getAnsweredMcqs(studentId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mcqs = yield this.studentRepository.findMcqsAnswered(studentId);
                return mcqs;
            }
            catch (error) {
                console.error("Error occurred while fetching Answered Mcqs:", error);
                next(new errorHandler_1.default(500, "Failed to fetch Answered Mcqs"));
                return [];
            }
        });
    }
    getRemarks(batchId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const remarks = yield this.studentRepository.findRemarks(batchId);
                return remarks;
            }
            catch (error) {
                console.error("Error getting remarks:", error);
                throw new Error("Failed to get remarks");
            }
        });
    }
    getAttendance(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const attendance = yield this.studentRepository.findAttendance(studentId);
                return attendance;
            }
            catch (error) {
                console.error("Error getting attendance:", error);
                throw new Error("Failed to get attendance");
            }
        });
    }
    getBatchRanks(batchId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const students = yield this.studentRepository.findBatchRanks(batchId);
                return students;
            }
            catch (error) {
                console.error("Error finding student ranks:", error);
                next(new errorHandler_1.default(500, "Failed to find student ranks:"));
                return [];
            }
        });
    }
}
exports.StudentUseCase = StudentUseCase;
//# sourceMappingURL=studentUseCase.js.map