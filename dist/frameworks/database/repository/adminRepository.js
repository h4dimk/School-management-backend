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
exports.AdminRepository = void 0;
const index_1 = require("./adminRepository/index");
class AdminRepository {
    constructor(adminModels) {
        this.adminModels = adminModels;
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adminExist = yield (0, index_1.findByEmail)(email);
                return adminExist;
            }
            catch (error) {
                console.error("Error occurred while logging in admin:", error);
                throw new Error("Failed to log in admin");
            }
        });
    }
    createTeacher(teacher) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, index_1.createTeacher)(teacher);
            }
            catch (error) {
                console.error("Error creating teacher:", error);
                throw new Error("Failed to create teacher");
            }
        });
    }
    findTeacher(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const teacherExist = yield (0, index_1.findTeacher)(email);
                return teacherExist;
            }
            catch (error) {
                console.error("Error finding teacher by email:", error);
                throw new Error("Failed to find teacher by email");
            }
        });
    }
    getTeachers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const teachers = yield (0, index_1.getTeachers)();
                return teachers;
            }
            catch (error) {
                throw new Error("Failed to fetch teachers");
            }
        });
    }
    blockTeacher(teacherId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isActive = yield (0, index_1.blockTeacher)(teacherId);
                return isActive;
            }
            catch (error) {
                console.error("Error blocking/unblocking teacher:", error);
                throw new Error("Failed to block/unblock teacher");
            }
        });
    }
    removeTeacher(teacherId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, index_1.removeTeacher)(teacherId);
            }
            catch (error) {
                console.error("Error removing teacher:", error);
                throw new Error("Failed to remove teacher");
            }
        });
    }
    createStudent(student) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, index_1.createStudent)(student);
            }
            catch (error) {
                console.error("Error creating student:", error);
                throw new Error("Failed to create student");
            }
        });
    }
    findStudent(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const studentExist = yield (0, index_1.findStudent)(email);
                return studentExist;
            }
            catch (error) {
                console.error("Error finding student by email:", error);
                throw new Error("Failed to find student by email");
            }
        });
    }
    getStudents() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const students = yield (0, index_1.getStudents)();
                return students;
            }
            catch (error) {
                throw new Error("Failed to fetch students");
            }
        });
    }
    blockStudent(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isActive = yield (0, index_1.blockStudent)(studentId);
                return isActive;
            }
            catch (error) {
                console.error("Error blocking/unblocking student:", error);
                throw new Error("Failed to block/unblock student");
            }
        });
    }
    removeStudent(studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, index_1.removeStudent)(studentId);
            }
            catch (error) {
                console.error("Error removing student:", error);
                throw new Error("Failed to remove student");
            }
        });
    }
    createCourse(course) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, index_1.createCourse)(course);
            }
            catch (error) {
                console.error("Error creating course:", error);
                throw new Error("Failed to create course");
            }
        });
    }
    findCourse(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courseExist = yield (0, index_1.findCourse)(name);
                return courseExist;
            }
            catch (error) {
                console.error("Error finding course by name:", error);
                throw new Error("Failed to find course by name");
            }
        });
    }
    getCourse() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courses = yield (0, index_1.getCourses)();
                return courses;
            }
            catch (error) {
                throw new Error("Failed to fetch courses");
            }
        });
    }
    removeCourse(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, index_1.removeCourse)(courseId);
            }
            catch (error) {
                console.error("Error removing course:", error);
                throw new Error("Failed to remove course");
            }
        });
    }
    updateCourse(courseId, updatedCourse) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!courseId) {
                    throw new Error("Course ID is required");
                }
                const course = yield (0, index_1.upadateCourse)(courseId, updatedCourse);
                if (!course) {
                    throw new Error("Course not found");
                }
                return course;
            }
            catch (error) {
                throw new Error("Failed to update Course");
            }
        });
    }
    getAdminById(adminId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!adminId) {
                    throw new Error("Admin ID is required");
                }
                const admin = yield (0, index_1.getAdminById)(adminId);
                return admin;
            }
            catch (error) {
                throw new Error("Failed to fetch admin");
            }
        });
    }
    updateAdmin(adminId, admin) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!adminId) {
                    throw new Error("Admin ID is required");
                }
                const updatedAdmin = yield (0, index_1.updateAdmin)(adminId, admin);
                return updatedAdmin;
            }
            catch (error) {
                throw new Error("Failed to update admin");
            }
        });
    }
    addBatch(batch) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, index_1.addBatch)(batch);
            }
            catch (error) {
                console.error("Error occurred while adding batch:", error); // Log the error
                throw new Error("Failed to add batch.");
            }
        });
    }
    getBatches() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const batches = yield (0, index_1.getBatches)();
                return batches;
            }
            catch (error) {
                throw new Error("Failed to fetch batches");
            }
        });
    }
    removeBatch(batchId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, index_1.removeBatch)(batchId);
            }
            catch (error) {
                console.error("Error removing batch:", error);
                throw new Error("Failed to remove batch");
            }
        });
    }
    updateBatch(batchId, studentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const batch = yield (0, index_1.addStudentBatch)(batchId, studentId);
                if (!batch) {
                    throw new Error("Batch not found");
                }
                return batch;
            }
            catch (error) {
                console.error("Error updating batch:", error);
                throw new Error("Failed to updating batch");
            }
        });
    }
    addAnnouncement(announcementData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, index_1.addAnnouncement)(announcementData);
            }
            catch (error) {
                console.error("Error occurred while adding announcement:", error);
                throw new Error("Failed to add announcement.");
            }
        });
    }
    removeAnnouncement(announcementId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, index_1.removeAnnouncement)(announcementId);
            }
            catch (error) {
                console.error("Error removing announcement:", error);
                throw new Error("Failed to remove announcement");
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
    getTeachersLeaves() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const leaves = yield (0, index_1.findTeachersLeaves)();
                return leaves;
            }
            catch (error) {
                console.error("Error fetching leave:", error);
                throw new Error("Failed to fetch leave. Please try again later.");
            }
        });
    }
    getStudentsLeaves() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const leaves = yield (0, index_1.findStudentsLeaves)();
                return leaves;
            }
            catch (error) {
                console.error("Error fetching leave:", error);
                throw new Error("Failed to fetch leave. Please try again later.");
            }
        });
    }
    updateTeachersLeaveStatus(leaveId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, index_1.updateTeachersLeaveStatus)(leaveId, status);
            }
            catch (error) {
                console.error("Error updating leave:", error);
                throw new Error("Failed to update leave. Please try again later.");
            }
        });
    }
    updateStudentsLeaveStatus(leaveId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, index_1.updateStudentsLeaveStatus)(leaveId, status);
            }
            catch (error) {
                console.error("Error updating leave:", error);
                throw new Error("Failed to update leave. Please try again later.");
            }
        });
    }
    createGroup(groupData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, index_1.createGroup)(groupData);
            }
            catch (error) {
                console.error("Error creating Group:", error);
                throw new Error("Failed to create Group");
            }
        });
    }
    createTimetable(timetable) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdtimetable = yield (0, index_1.createTimetable)(timetable);
            }
            catch (error) {
                console.error("Error creating timetable:", error);
                throw new Error("Failed to create timetable");
            }
        });
    }
    removeTimetable(timetableId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, index_1.deleteTimetable)(timetableId);
            }
            catch (error) {
                console.error("Error removing timetable:", error);
                throw new Error("Failed to remove timetable");
            }
        });
    }
    getTimetables() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const timetables = yield (0, index_1.findTimetables)();
                return timetables;
            }
            catch (error) {
                console.error("Error fetching timetables:", error);
                throw new Error("Failed to fetch timetables. Please try again later.");
            }
        });
    }
    validateTimeTable(date, period, batch, teacher) {
        return __awaiter(this, void 0, void 0, function* () {
            const timeTableDateError = yield (0, index_1.validateTimetableDate)(date);
            if (timeTableDateError) {
                return timeTableDateError;
            }
            const existingTimetableError = yield (0, index_1.existingTimetable)(period, date, batch);
            if (existingTimetableError) {
                return existingTimetableError;
            }
            const alreadyAssignedTeacherError = yield (0, index_1.alreadyAssignedTeacher)(period, date, teacher);
            if (alreadyAssignedTeacherError) {
                return alreadyAssignedTeacherError;
            }
        });
    }
    fetchAttendence() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const attendance = yield (0, index_1.getAttendence)();
                return attendance;
            }
            catch (error) {
                console.error("Error fetching attendance:", error);
                throw new Error("Failed to fetch attendance");
            }
        });
    }
}
exports.AdminRepository = AdminRepository;
//# sourceMappingURL=adminRepository.js.map