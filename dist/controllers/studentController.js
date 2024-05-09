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
exports.StudentController = void 0;
const errorHandler_1 = __importDefault(require("../useCases/middlewares/errorHandler"));
const mcqSubmitModel_1 = __importDefault(require("../frameworks/database/models/mcqSubmitModel"));
class StudentController {
    constructor(studentUseCase) {
        this.studentUseCase = studentUseCase;
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const result = yield this.studentUseCase.login(email, password, next);
                return res.status(200).json({ result, success: true });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    getStudentProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const studentId = req.params.id;
                const student = yield this.studentUseCase.getStudentProfile(studentId);
                if (!student) {
                    res.status(404).json({ error: "Student not found" });
                    return;
                }
                res.status(200).json({ student, success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    updateStudentProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const studentId = req.params.id;
                const updates = req.body;
                yield this.studentUseCase.updateStudentProfile(studentId, updates);
                res.status(200).json({ success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    getAnnouncements(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const announcements = yield this.studentUseCase.getAnnouncements(next);
                res.json(announcements);
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    applyLeave(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { leaveType, startDate, endDate, reason, studentBatch } = req.body;
                const studentId = req.params.id;
                const newLeave = {
                    leaveType,
                    startDate,
                    endDate,
                    reason,
                    studentBatch,
                    student: studentId,
                };
                const leave = yield this.studentUseCase.applyLeave(newLeave, next);
                res.status(201).json({ leave, success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    getLeaves(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const studentId = req.params.id;
                const leaves = yield this.studentUseCase.getLeaves(studentId);
                res.status(201).json({ leaves, success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    cancelLeave(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const leaveId = req.params.id;
                yield this.studentUseCase.cancelLeave(leaveId);
                res.status(201).json({ success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    addMessage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { message, sender, group, date } = req.body;
                const newMessage = {
                    message,
                    sender,
                    group,
                    date,
                };
                const createdmessage = yield this.studentUseCase.addMessage(newMessage);
                res.status(201).json({ createdmessage, success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    getChats(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const batchId = req.params.id;
                const chats = yield this.studentUseCase.getChats(batchId);
                res.status(201).json({ chats, success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    getTimetables(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const batchId = req.params.id;
                const timetables = yield this.studentUseCase.getTimetables(batchId, next);
                res.status(200).json({ timetables, success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    getMcqsByBatch(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { studentId } = req.query;
                const { id: batchId } = req.params;
                const mcqs = yield this.studentUseCase.findMcqsByBatch(batchId, studentId, next);
                res.status(200).json({ mcqs, success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    submitAnswer(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { mcqId, studentId, isCorrect, batchId } = req.body;
                // Check if mcqId and studentId are present
                if (!mcqId || !studentId) {
                    throw new Error("MCQ ID and student ID are required.");
                }
                // Check if isCorrect is a boolean value
                if (typeof isCorrect !== "boolean") {
                    throw new Error("isCorrect must be a boolean value.");
                }
                const attendedQuestion = yield mcqSubmitModel_1.default.findOne({
                    mcqId,
                    studentId,
                });
                if (attendedQuestion) {
                    return res
                        .status(400)
                        .json({ message: "You have already attended this question" });
                }
                const newAnswer = {
                    mcqId,
                    studentId,
                    isCorrect,
                    batchId,
                };
                yield this.studentUseCase.submitAnswer(newAnswer, next);
                res.status(200).json({ success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    addAssignment(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, assignment, studentId, batchId } = req.body;
                const newAssignment = {
                    name,
                    assignment,
                    student: studentId,
                    batch: batchId,
                };
                yield this.studentUseCase.addAssignment(newAssignment, next);
                res.status(200).json({ success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    getAssignmentsStudents(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const studentId = req.params.id;
                const assignments = yield this.studentUseCase.getAssignments(studentId, next);
                res.status(200).json({ assignments, success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    getAnsweredMcqsById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const studentId = req.params.id;
                const answeredMcqs = yield this.studentUseCase.getAnsweredMcqs(studentId, next);
                res.status(200).json({ answeredMcqs, success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    getRemarks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const batchId = req.params.id;
                const remarks = yield this.studentUseCase.getRemarks(batchId);
                res.status(201).json({ remarks, success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    getAttendence(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const studentId = req.params.id;
                const attendance = yield this.studentUseCase.getAttendance(studentId);
                res.status(201).json({ attendance, success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    getBatchRanks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const batchId = req.params.id;
                const ranks = yield this.studentUseCase.getBatchRanks(batchId, next);
                res.status(201).json({ ranks, success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
}
exports.StudentController = StudentController;
//# sourceMappingURL=studentController.js.map