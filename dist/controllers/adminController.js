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
exports.AdminController = void 0;
const crypto_1 = require("crypto");
const roles_1 = __importDefault(require("../@types/enum/roles"));
const errorHandler_1 = __importDefault(require("../useCases/middlewares/errorHandler"));
const courseModel_1 = __importDefault(require("../frameworks/database/models/courseModel"));
class AdminController {
    constructor(adminUseCase) {
        this.adminUseCase = adminUseCase;
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const result = yield this.adminUseCase.login(email, password, next);
                res.status(200).json({ result, success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    addTeacher(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, subject, gender, batch, batchId } = req.body;
                if (!name || !email || !subject || !gender || !batchId) {
                    throw new Error("Please fill in all fields.");
                }
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    throw new Error("Please enter a valid email address.");
                }
                const password = (0, crypto_1.randomBytes)(8).toString("hex");
                const role = roles_1.default.TEACHER;
                const newTeacher = {
                    name,
                    email,
                    batch,
                    batchId,
                    subject,
                    gender,
                    password,
                    role,
                };
                console.log("email :", email, "password : ", password);
                const addedTeacher = yield this.adminUseCase.addTeacher(newTeacher, next);
                res.status(201).json({ addedTeacher, success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    getTeachers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const teachers = yield this.adminUseCase.getTeachers(next);
                res.json(teachers);
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    blockTeacher(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const teacherId = req.params.id;
            try {
                const isActive = yield this.adminUseCase.blockTeacher(teacherId, next);
                res.status(200).json({ isActive, success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    removeTeacher(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const teacherId = req.params.id;
            try {
                yield this.adminUseCase.removeTeacher(teacherId, next);
                res
                    .status(200)
                    .json({ message: "Teacher removed successfully", success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    addStudent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, course, batch, gender, batchId } = req.body;
                if (!name || !email || !course || !batch || !gender || !batchId) {
                    throw new Error("Please fill in all fields.");
                }
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    throw new Error("Please enter a valid email address.");
                }
                const password = (0, crypto_1.randomBytes)(8).toString("hex");
                const role = roles_1.default.STUDENT;
                const newStudent = {
                    name,
                    email,
                    course,
                    batch,
                    batchId,
                    gender,
                    password,
                    role,
                };
                console.log("email :", email, "password : ", password);
                const addedStudent = yield this.adminUseCase.addStudent(newStudent, next);
                res.status(201).json({ addedStudent, success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    getStudents(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const students = yield this.adminUseCase.getStudents(next);
                res.json(students);
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    blockStudent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const studentId = req.params.id;
            try {
                const isActive = yield this.adminUseCase.blockStudent(studentId, next);
                res.status(200).json({ isActive, success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    removeStudent(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const studentId = req.params.id;
            try {
                yield this.adminUseCase.removeStudent(studentId, next);
                res
                    .status(200)
                    .json({ message: "Student removed successfully", success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    addCourse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { course, subjects } = req.body;
                const existingCourse = yield courseModel_1.default.findOne({
                    course: { $regex: new RegExp(`^${course}$`, "i") },
                });
                if (existingCourse) {
                    return res
                        .status(400)
                        .json({ message: "Course in this name is already added" });
                }
                // Validate input fields
                if (!course ||
                    !subjects ||
                    !Array.isArray(subjects) ||
                    subjects.length === 0) {
                    throw new Error("Please provide a course and at least one subject.");
                }
                // Ensure each subject is a non-empty string
                for (const subject of subjects) {
                    if (typeof subject !== "string" || subject.trim() === "") {
                        throw new Error("Invalid subject format.");
                    }
                }
                const newCourse = { course, subjects };
                const addedCourse = yield this.adminUseCase.addCourse(newCourse, next);
                res.status(201).json({ addedCourse, success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    getCourses(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courses = yield this.adminUseCase.getCourses(next);
                res.json(courses);
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    removeCourse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const courseId = req.params.id;
            try {
                yield this.adminUseCase.removeCourse(courseId, next);
                res
                    .status(200)
                    .json({ message: "Course removed successfully", success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    updateCourseDetails(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courseId = req.params.id;
                const updates = req.body;
                yield this.adminUseCase.editCourse(courseId, updates);
                res.status(200).json({ success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    getAdminProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminId = req.params.id;
                const admin = yield this.adminUseCase.getAdminProfile(adminId);
                if (!admin) {
                    res.status(404).json({ error: "Admin not found" });
                    return;
                }
                res.status(200).json({ admin, success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    updateAdminProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminId = req.params.id;
                const updates = req.body;
                yield this.adminUseCase.updateAdminProfile(adminId, updates);
                res.status(200).json({ success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    addBatch(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, students } = req.body;
                // Validate input fields
                if (!name || typeof name !== "string" || !name.trim()) {
                    throw new Error("Please provide a valid name.");
                }
                const newBatch = { name, students };
                const addedBatch = yield this.adminUseCase.addBatch(newBatch, next);
                res.status(201).json({ addedBatch, success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    getBatches(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const batches = yield this.adminUseCase.getBatches(next);
                res.json(batches);
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    removeBatch(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const batchId = req.params.id;
            try {
                yield this.adminUseCase.removeBatch(batchId, next);
                res
                    .status(200)
                    .json({ message: "Batch removed successfully", success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    addAnnouncement(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { announcement, date } = req.body;
                const newAnnouncementData = {
                    announcement,
                    date,
                };
                const addedAnnouncement = yield this.adminUseCase.addAnnouncement(newAnnouncementData, next);
                res.status(201).json({ addedAnnouncement, success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    getAnnouncements(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const announcements = yield this.adminUseCase.getAnnouncements(next);
                res.json(announcements);
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    removeAnnouncement(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const announcementId = req.params.id;
            try {
                yield this.adminUseCase.removeAnnouncemet(announcementId, next);
                res
                    .status(200)
                    .json({ message: "Annoucement removed successfully", success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    getTeachersLeaves(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const leaves = yield this.adminUseCase.getTeachersLeaves(next);
                res.status(200).json({ leaves, success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    getStudentsLeaves(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const leaves = yield this.adminUseCase.getStudentsLeaves(next);
                res.status(200).json({ leaves, success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    updateTeachersLeaveStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { leaveId, status } = req.body;
                yield this.adminUseCase.updateTeacherLeaveStatus(leaveId, status, next);
                res
                    .status(200)
                    .json({ message: "Leave updated successfully", success: true });
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
                yield this.adminUseCase.updateStudentsLeaveStatus(leaveId, status, next);
                res
                    .status(200)
                    .json({ message: "Leave updated successfully", success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    addTimetable(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { date, batch, period, subject, teacher } = req.body;
                if (!date || !batch || !period || !subject || !teacher) {
                    throw new Error("Please fill in all fields.");
                }
                const timetableError = yield this.adminUseCase.validateTimetable(date, period, batch, teacher);
                if (timetableError) {
                    return res.status(400).json({
                        message: timetableError,
                        success: false,
                    });
                }
                const newTimetable = {
                    date,
                    batch,
                    period,
                    subject,
                    teacher,
                };
                const addedTimetable = yield this.adminUseCase.addTimetable(newTimetable, next);
                res.status(201).json({ addedTimetable, success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    deleteTimetable(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const timetableId = req.params.id;
                yield this.adminUseCase.removeTimetable(timetableId, next);
                res
                    .status(200)
                    .json({ message: "Timetable removed successfully", success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    getTimetables(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const timetables = yield this.adminUseCase.getTimetables(next);
                res.status(200).json({ timetables, success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
    getAtendence(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const attendance = yield this.adminUseCase.getTodaysAttendence(next);
                res.status(200).json({ attendance, success: true });
            }
            catch (error) {
                next(new errorHandler_1.default(500, error.message));
            }
        });
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=adminController.js.map