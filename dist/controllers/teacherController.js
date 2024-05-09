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
exports.TeacherController = void 0;
const errorHandler_1 = __importDefault(require("../useCases/middlewares/errorHandler"));
const attendenceModel_1 = __importDefault(require("../frameworks/database/models/attendenceModel"));
class TeacherController {
    constructor(teacherUseCase) {
        this.teacherUseCase = teacherUseCase;
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const result = yield this.teacherUseCase.login(email, password, next);
                return res.status(200).json({ result, success: true });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    getTeacherProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const teacherId = req.params.id;
                const teacher = yield this.teacherUseCase.getTeacherProfile(teacherId);
                if (!teacher) {
                    res.status(404).json({ error: "Teacher not found" });
                    return;
                }
                res.status(200).json({ teacher, success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    updateTeacherProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const teacherId = req.params.id;
                const updates = req.body;
                yield this.teacherUseCase.updateTeacherProfile(teacherId, updates);
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
                const announcements = yield this.teacherUseCase.getAnnouncements(next);
                res.json(announcements);
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    uploadAttendance(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { batchId, present, absent, date } = req.body;
                if (!batchId || !present || !absent || !date) {
                    throw new errorHandler_1.default(400, "Batch ID, present students,date, and absent students are required");
                }
                const existingAttendance = yield attendenceModel_1.default.findOne({
                    batchId,
                    date: { $gte: new Date().setHours(0, 0, 0, 0) },
                });
                if (existingAttendance) {
                    return res
                        .status(400)
                        .json({ message: "Attendance already taken for today." });
                }
                const newAttendence = {
                    batchId,
                    present,
                    absent,
                    date,
                };
                const attendance = yield this.teacherUseCase.addAttendance(newAttendence, next);
                res.status(201).json({ attendance, success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    getAttendance(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const batchId = req.params.id;
            try {
                const attendance = yield this.teacherUseCase.getAttendance(batchId, next);
                res.status(200).json({ attendance });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    applyLeave(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { leaveType, startDate, endDate, reason } = req.body;
                const teacherId = req.params.id;
                const newLeave = {
                    leaveType,
                    startDate,
                    endDate,
                    reason,
                    teacher: teacherId,
                };
                const leave = yield this.teacherUseCase.applyLeave(newLeave, next);
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
                const teacherId = req.params.id;
                const leaves = yield this.teacherUseCase.getLeaves(teacherId);
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
                yield this.teacherUseCase.cancelLeave(leaveId);
                res.status(201).json({ success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    getStudentsLeaves(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const batch = req.query.batch;
                const leaves = yield this.teacherUseCase.getStudentsLeaves(batch, next);
                res.status(200).json({ leaves, success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    updateStudentsLeaveStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { leaveId, status } = req.body;
                yield this.teacherUseCase.updateLeaveStatus(leaveId, status, next);
                res
                    .status(200)
                    .json({ message: "Leave updated successfully", success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    getTimetables(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const teacherId = req.params.id;
                const timetables = yield this.teacherUseCase.getTimetables(teacherId, next);
                res.status(200).json({ timetables, success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    addMcq(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { batchId, correctAnswer, options, question, teacherId } = req.body;
                if (!batchId || !correctAnswer || !question || !teacherId) {
                    return res.status(400).json({ message: "All fields are required" });
                }
                for (const option of options) {
                    if (typeof option !== "string" || option.trim() === "") {
                        return res
                            .status(400)
                            .json({ message: "Options should be non-empty" });
                    }
                }
                const newMcq = {
                    batchId,
                    correctAnswer,
                    options,
                    question,
                    teacherId,
                };
                const createdMcq = yield this.teacherUseCase.addMcq(newMcq, next);
                res.status(200).json({ createdMcq, success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    getMcqsForTeacher(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const teacherId = req.params.id;
                const mcqs = yield this.teacherUseCase.findMcqsByTeacher(teacherId, next);
                res.status(200).json({ mcqs, success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    getMcqsByBatch(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const batchId = req.params.id;
                const mcqs = yield this.teacherUseCase.findMcqsByBatch(batchId, next);
                res.status(200).json({ mcqs, success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    getAssignmentsBatch(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const batchId = req.params.id;
                const assignments = yield this.teacherUseCase.getAssignments(batchId, next);
                res.status(200).json({ assignments, success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    // async addMessage(req: Req, res: Res, next: Next) {
    //   try {
    //     const { message, sender, group } = req.body;
    //     const newMessage: IMessage = {
    //       message,
    //       sender,
    //       group,
    //     };
    //     const createdmessage = await this.teacherUseCase.addMessage(newMessage);
    //     res.status(201).json({ createdmessage, success: true });
    //   } catch (error: any) {
    //     next(new ErrorHandler(500, error.message));
    //   }
    // }
    getChats(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const batchId = req.params.id;
                const chats = yield this.teacherUseCase.getChats(batchId);
                res.status(201).json({ chats, success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    addRemark(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { batchId, date, remark, subject, teacherId, files } = req.body;
                if (!batchId || !date || !remark || !subject || !teacherId) {
                    throw new Error("Batch ID, date, remark, subject, and teacher ID are required.");
                }
                const newRemark = {
                    batchId,
                    date,
                    remark,
                    subject,
                    teacherId,
                    files,
                };
                const addedRemark = yield this.teacherUseCase.addRemarks(newRemark);
                res.status(201).json({ addedRemark, success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    getRemarks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const teacherId = req.params.id;
                const remarks = yield this.teacherUseCase.getRemarks(teacherId);
                res.status(201).json({ remarks, success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    getBatches(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const batches = yield this.teacherUseCase.getBatches();
                res.status(201).json({ batches, success: true });
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
                const ranks = yield this.teacherUseCase.getBatchRanks(batchId, next);
                res.status(201).json({ ranks, success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
}
exports.TeacherController = TeacherController;
//# sourceMappingURL=teacherController.js.map