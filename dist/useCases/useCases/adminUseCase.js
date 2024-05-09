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
exports.AdminUseCase = void 0;
const errorHandler_1 = __importDefault(require("../middlewares/errorHandler"));
class AdminUseCase {
    // private readonly io:Server;
    constructor(adminRepository, jwt, sendMail, hashPassword
    // io: Server
    ) {
        this.adminRepository = adminRepository;
        this.jwt = jwt;
        this.sendMail = sendMail;
        this.hashPassword = hashPassword;
        // this.io = io;
    }
    login(email, password, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin = yield this.adminRepository.findByEmail(email);
                if (admin) {
                    const passwordMatch = yield this.hashPassword.comparePassword(password, admin.password);
                    // const passwordMatch= password==admin.password
                    if (passwordMatch && admin._id && admin.role) {
                        const token = yield this.jwt.createToken({
                            _id: admin._id,
                            role: admin.role,
                        });
                        admin.password = "";
                        return { admin, token };
                    }
                    else {
                        next(new errorHandler_1.default(401, "Invalid credentials"));
                        return;
                    }
                }
            }
            catch (error) {
                console.error("Error occurred while logging in admin:", error);
                next(new errorHandler_1.default(500, "Failed to log in admin"));
                return;
            }
        });
    }
    addTeacher(teacher, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingTeacher = yield this.adminRepository.findTeacher(teacher.email);
                if (existingTeacher) {
                    next(new errorHandler_1.default(400, "Teacher with this email already exists"));
                    return;
                }
                const existingStudent = yield this.adminRepository.findStudent(teacher.email);
                if (existingStudent) {
                    next(new errorHandler_1.default(400, "Student with this email already exists"));
                    return;
                }
                this.sendMail.sendEmail(teacher.name, teacher.email, teacher.password);
                const hashedPassword = yield this.hashPassword.createHash(teacher.password);
                teacher.password = hashedPassword;
                return yield this.adminRepository.createTeacher(teacher);
            }
            catch (error) {
                console.error("Error creating teacher:", error);
                next(new errorHandler_1.default(500, "Failed to create teacher"));
            }
        });
    }
    getTeachers(next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const teachers = yield this.adminRepository.getTeachers();
                return teachers;
            }
            catch (error) {
                console.error("Error fetching teachers:", error);
                next(new errorHandler_1.default(500, "Failed to fetch teachers"));
                return [];
            }
        });
    }
    blockTeacher(teacherId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isActive = yield this.adminRepository.blockTeacher(teacherId);
                return isActive;
            }
            catch (error) {
                console.error("Error blocking/unblocking teacher:", error);
                next(new errorHandler_1.default(500, "Failed to block/unblock teacher"));
                return false;
            }
        });
    }
    removeTeacher(teacherId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.adminRepository.removeTeacher(teacherId);
            }
            catch (error) {
                console.error("Error removing teacher:", error);
                next(new errorHandler_1.default(500, "Failed to remove teacher"));
            }
        });
    }
    addStudent(student, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingStudent = yield this.adminRepository.findStudent(student.email);
                if (existingStudent) {
                    next(new errorHandler_1.default(400, "Student with this email already exists"));
                    return;
                }
                const existingTeacher = yield this.adminRepository.findTeacher(student.email);
                if (existingTeacher) {
                    next(new errorHandler_1.default(400, "Teacher with this email already exists"));
                    return;
                }
                this.sendMail.sendEmail(student.name, student.email, student.password);
                const hashedPassword = yield this.hashPassword.createHash(student.password);
                student.password = hashedPassword;
                const createdStudent = yield this.adminRepository.createStudent(student);
                yield this.adminRepository.updateBatch(student.batchId, (_a = createdStudent._id) !== null && _a !== void 0 ? _a : "defaultStudentId");
            }
            catch (error) {
                console.error("Error creating student:", error);
                next(new errorHandler_1.default(500, "Failed to create student"));
            }
        });
    }
    getStudents(next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const students = yield this.adminRepository.getStudents();
                return students;
            }
            catch (error) {
                console.error("Error fetching students:", error);
                next(new errorHandler_1.default(500, "Failed to fetch students"));
                return [];
            }
        });
    }
    blockStudent(studentId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isActive = yield this.adminRepository.blockStudent(studentId);
                return isActive;
            }
            catch (error) {
                console.error("Error blocking/unblocking student:", error);
                next(new errorHandler_1.default(500, "Failed to block/unblock student"));
                return false;
            }
        });
    }
    removeStudent(studentId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.adminRepository.removeStudent(studentId);
            }
            catch (error) {
                console.error("Error removing student:", error);
                next(new errorHandler_1.default(500, "Failed to remove student"));
            }
        });
    }
    addCourse(course, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingCourse = yield this.adminRepository.findCourse(course.course);
                if (existingCourse) {
                    next(new errorHandler_1.default(400, "Course with this name already exists"));
                    return;
                }
                return yield this.adminRepository.createCourse(course);
            }
            catch (error) {
                console.error("Error creating course:", error);
                next(new errorHandler_1.default(500, "Failed to create course"));
            }
        });
    }
    getCourses(next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courses = yield this.adminRepository.getCourse();
                return courses;
            }
            catch (error) {
                console.error("Error fetching courses:", error);
                next(new errorHandler_1.default(500, "Failed to fetch courses"));
                return [];
            }
        });
    }
    removeCourse(courseId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.adminRepository.removeCourse(courseId);
            }
            catch (error) {
                console.error("Error removing course:", error);
                next(new errorHandler_1.default(500, "Failed to remove course"));
            }
        });
    }
    editCourse(courseId, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!courseId) {
                    throw new Error("Course ID is required");
                }
                const updatedCourse = yield this.adminRepository.updateCourse(courseId, updates);
                return updatedCourse;
            }
            catch (error) {
                console.error("Error updating course:", error);
                throw new errorHandler_1.default(500, "Failed to update course");
            }
        });
    }
    getAdminProfile(adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!adminId) {
                    throw new Error("Admin ID is required");
                }
                const admin = yield this.adminRepository.getAdminById(adminId);
                return admin;
            }
            catch (error) {
                console.error("Error fetching admin profile:", error);
                throw new errorHandler_1.default(500, "Failed to fetch admin profile");
            }
        });
    }
    updateAdminProfile(adminId, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!adminId) {
                    throw new Error("Admin ID is required");
                }
                if (updates.password) {
                    const hashedPassword = yield this.hashPassword.createHash(updates.password);
                    updates.password = hashedPassword;
                }
                const updatedAdmin = yield this.adminRepository.updateAdmin(adminId, updates);
                if (!updatedAdmin) {
                    throw new errorHandler_1.default(404, "Admin not found");
                }
                return updatedAdmin;
            }
            catch (error) {
                console.error("Error updating admin profile:", error);
                throw new errorHandler_1.default(500, "Failed to update admin profile");
            }
        });
    }
    addBatch(batch, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.adminRepository.addBatch(batch);
            }
            catch (error) {
                console.error("Error creating batch:", error);
                next(new errorHandler_1.default(500, "Failed to create batch"));
            }
        });
    }
    getBatches(next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const batches = yield this.adminRepository.getBatches();
                return batches;
            }
            catch (error) {
                console.error("Error fetching batches:", error);
                next(new errorHandler_1.default(500, "Failed to fetch batches"));
                return [];
            }
        });
    }
    removeBatch(batchId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.adminRepository.removeBatch(batchId);
            }
            catch (error) {
                console.error("Error removing batch:", error);
                next(new errorHandler_1.default(500, "Failed to remove batch"));
            }
        });
    }
    addAnnouncement(announcementData, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newAnnouncement = yield this.adminRepository.addAnnouncement(announcementData);
                return newAnnouncement;
            }
            catch (error) {
                console.error("Error creating annousment:", error);
                next(new errorHandler_1.default(500, "Failed to create annousment"));
            }
        });
    }
    getAnnouncements(next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const announcements = yield this.adminRepository.getAnnouncements();
                return announcements;
            }
            catch (error) {
                console.error("Error fetching announcements:", error);
                next(new errorHandler_1.default(500, "Failed to fetch announcements"));
                return [];
            }
        });
    }
    removeAnnouncemet(announcementId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.adminRepository.removeAnnouncement(announcementId);
            }
            catch (error) {
                console.error("Error removing annousment:", error);
                next(new errorHandler_1.default(500, "Failed to remove annousment"));
            }
        });
    }
    getTeachersLeaves(next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const leaves = yield this.adminRepository.getTeachersLeaves();
                return leaves;
            }
            catch (error) {
                console.error("Error fetching leaves:", error);
                next(new errorHandler_1.default(500, "Failed to fetch leaves"));
                return [];
            }
        });
    }
    getStudentsLeaves(next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const leaves = yield this.adminRepository.getStudentsLeaves();
                return leaves;
            }
            catch (error) {
                console.error("Error fetching leaves:", error);
                next(new errorHandler_1.default(500, "Failed to fetch leaves"));
                return [];
            }
        });
    }
    updateTeacherLeaveStatus(leaveId, status, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.adminRepository.updateTeachersLeaveStatus(leaveId, status);
            }
            catch (error) {
                console.error("Error updating leave status:", error);
                next(new errorHandler_1.default(500, "Failed to update leave status"));
            }
        });
    }
    updateStudentsLeaveStatus(leaveId, status, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.adminRepository.updateStudentsLeaveStatus(leaveId, status);
            }
            catch (error) {
                console.error("Error updating leave status:", error);
                next(new errorHandler_1.default(500, "Failed to update leave status"));
            }
        });
    }
    addTimetable(timetable, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.adminRepository.createTimetable(timetable);
            }
            catch (error) {
                console.error("Error creating timetable:", error);
                next(new errorHandler_1.default(500, "Failed to create timetable"));
            }
        });
    }
    removeTimetable(timetableId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.adminRepository.removeTimetable(timetableId);
            }
            catch (error) {
                console.error("Error removing timetable:", error);
                next(new errorHandler_1.default(500, "Failed to remove timetable"));
            }
        });
    }
    getTimetables(next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const timetables = yield this.adminRepository.getTimetables();
                return timetables;
            }
            catch (error) {
                console.error("Error fetching timetables:", error);
                next(new errorHandler_1.default(500, "Failed to fetch timetables. Please try again later."));
                return [];
            }
        });
    }
    validateTimetable(date, period, batch, teacher) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.adminRepository.validateTimeTable(date, period, batch, teacher);
        });
    }
    getTodaysAttendence(next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const attendance = yield this.adminRepository.fetchAttendence();
                return attendance;
            }
            catch (error) {
                console.error("Error fetching attendence:", error);
                next(new errorHandler_1.default(500, "Failed to fetch attendence. Please try again later."));
                return { present: [], absent: [] };
            }
        });
    }
}
exports.AdminUseCase = AdminUseCase;
//# sourceMappingURL=adminUseCase.js.map