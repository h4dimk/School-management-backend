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
exports.TeacherUseCase = void 0;
const errorHandler_1 = __importDefault(require("../middlewares/errorHandler"));
class TeacherUseCase {
    constructor(teacherRepository, jwt, hashedPassword) {
        this.teacherRepository = teacherRepository;
        this.jwt = jwt;
        this.hashPassword = hashedPassword;
    }
    login(email, password, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const teacher = yield this.teacherRepository.findByEmail(email);
                if (teacher) {
                    const passwordMatch = yield this.hashPassword.comparePassword(password, teacher.password);
                    // const passwordMatch=password== teacher.password
                    if (passwordMatch && teacher._id && teacher.role) {
                        const token = yield this.jwt.createToken({
                            _id: teacher._id,
                            role: teacher.role,
                            // isActive: teacher.isActive,
                        });
                        teacher.password = "";
                        return { teacher, token };
                    }
                }
                next(new errorHandler_1.default(401, "Invalid credentials"));
                return;
            }
            catch (error) {
                console.error("Error occurred while logging in teacher:", error);
                next(new errorHandler_1.default(500, "Failed to log in teacher"));
                return;
            }
        });
    }
    getTeacherProfile(teacherId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!teacherId) {
                    throw new Error("Teacher ID is required");
                }
                const teacher = yield this.teacherRepository.getTeacherById(teacherId);
                return teacher;
            }
            catch (error) {
                console.error("Error fetching teacher profile:", error);
                throw new errorHandler_1.default(500, "Failed to fetch teacher profile");
            }
        });
    }
    updateTeacherProfile(teacherId, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!teacherId) {
                    throw new Error("Teacher ID is required");
                }
                if (updates.password) {
                    const hashedPassword = yield this.hashPassword.createHash(updates.password);
                    updates.password = hashedPassword;
                }
                const updatedTeacher = yield this.teacherRepository.updateTeacher(teacherId, updates);
                if (!updatedTeacher) {
                    throw new errorHandler_1.default(404, "Teacher not found");
                }
                return updatedTeacher;
            }
            catch (error) {
                console.error("Error updating Teacher profile:", error);
                throw new errorHandler_1.default(500, "Failed to update Teacher profile");
            }
        });
    }
    getAnnouncements(next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const announcements = yield this.teacherRepository.getAnnouncements();
                return announcements;
            }
            catch (error) {
                console.error("Error fetching announcements:", error);
                next(new errorHandler_1.default(500, "Failed to fetch announcements"));
                return [];
            }
        });
    }
    addAttendance(attendance, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdAttendance = yield this.teacherRepository.createAttendence(attendance);
                return createdAttendance;
            }
            catch (error) {
                console.error("Error adding attendance:", error);
                next(new errorHandler_1.default(500, "Failed to add attendance"));
            }
        });
    }
    getAttendance(batchId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const attendance = yield this.teacherRepository.getAttendance(batchId);
                return attendance;
            }
            catch (error) {
                console.error("Error fetching attendance:", error);
                next(new errorHandler_1.default(500, "Failed to fetch attendance"));
                return [];
            }
        });
    }
    applyLeave(leaveData, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdLeave = yield this.teacherRepository.createLeave(leaveData);
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
                const leaves = yield this.teacherRepository.findLeaves(studentId);
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
                yield this.teacherRepository.removeLeave(leaveId);
            }
            catch (error) {
                console.error("Error canceling leave:", error);
                throw new Error("Failed to cancel leave. Please try again later.");
            }
        });
    }
    getStudentsLeaves(batch, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const leaves = yield this.teacherRepository.getStudentsLeaves(batch);
                return leaves;
            }
            catch (error) {
                console.error("Error fetching leaves:", error);
                next(new errorHandler_1.default(500, "Failed to fetch leaves"));
                return [];
            }
        });
    }
    updateLeaveStatus(leaveId, status, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.teacherRepository.updateLeaveStatus(leaveId, status);
            }
            catch (error) {
                console.error("Error updating leave status:", error);
                next(new errorHandler_1.default(500, "Failed to update leave status"));
            }
        });
    }
    getTimetables(teacherId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const timetables = yield this.teacherRepository.getTimetables(teacherId);
                return timetables;
            }
            catch (error) {
                console.error("Error fetching timetables:", error);
                next(new errorHandler_1.default(500, "Failed to fetch timetables. Please try again later."));
                return [];
            }
        });
    }
    addMcq(mcqDetails, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.teacherRepository.createMcqs(mcqDetails);
            }
            catch (error) {
                console.error("Error occurred while adding Mcqs:", error);
                next(new errorHandler_1.default(500, "Failed to add Mcq. Please try again later."));
            }
        });
    }
    findMcqsByTeacher(teacherId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mcqs = yield this.teacherRepository.getMcqsByTeacher(teacherId);
                return mcqs;
            }
            catch (error) {
                console.error("Error fetching Mcqs:", error);
                next(new errorHandler_1.default(500, "Failed to fetch Mcqs. Please try again later."));
                return [];
            }
        });
    }
    findMcqsByBatch(batchId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mcqs = yield this.teacherRepository.getMcqsByBatch(batchId);
                return mcqs;
            }
            catch (error) {
                console.error("Error fetching Mcqs:", error);
                next(new errorHandler_1.default(500, "Failed to fetch Mcqs. Please try again later."));
                return [];
            }
        });
    }
    getAssignments(batchId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const assignments = yield this.teacherRepository.findAssignments(batchId);
                return assignments;
            }
            catch (error) {
                console.error("Error occurred while fetching assignments:", error);
                next(new errorHandler_1.default(500, "Failed to fetch Assignment"));
                return [];
            }
        });
    }
    addMessage(messageData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const message = yield this.teacherRepository.addMessage(messageData);
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
                const chats = yield this.teacherRepository.findChats(batchId);
                return chats;
            }
            catch (error) {
                console.error("Error getting chats:", error);
                throw new Error("Failed to get chats");
            }
        });
    }
    addRemarks(remarks) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addedRemark = yield this.teacherRepository.createRemarks(remarks);
                return addedRemark;
            }
            catch (error) {
                console.error("Error addding remark:", error);
                throw new Error("Failed to add remark");
            }
        });
    }
    getRemarks(teacherId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const remarks = yield this.teacherRepository.findRemarks(teacherId);
                return remarks;
            }
            catch (error) {
                console.error("Error getting remarks:", error);
                throw new Error("Failed to get remarks");
            }
        });
    }
    getBatches() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const batches = yield this.teacherRepository.findBatches();
                return batches;
            }
            catch (error) {
                console.error("Error getting batches:", error);
                throw new Error("Failed to get batches");
            }
        });
    }
    getBatchRanks(batchId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const students = yield this.teacherRepository.findBatchRanks(batchId);
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
exports.TeacherUseCase = TeacherUseCase;
//# sourceMappingURL=teacherUseCase.js.map