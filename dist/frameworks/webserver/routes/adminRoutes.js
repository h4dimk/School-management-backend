"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoute = void 0;
const roles_1 = __importDefault(require("../../../@types/enum/roles"));
const auth_1 = require("../middlewares/auth");
const catchAsyncErrors_1 = require("../middlewares/catchAsyncErrors");
const injuctions_1 = require("./injuctions/injuctions");
const adminRoute = (router) => {
    router.post("/login", (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.adminController.login(req, res, next);
    }));
    router.post("/add-teacher", auth_1.isAuth, (0, auth_1.role)([roles_1.default.ADMIN]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.adminController.addTeacher(req, res, next);
    }));
    router.get("/get-teachers", auth_1.isAuth, (0, auth_1.role)([roles_1.default.ADMIN]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.adminController.getTeachers(req, res, next);
    }));
    router.put("/block-teacher/:id", auth_1.isAuth, (0, auth_1.role)([roles_1.default.ADMIN]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.adminController.blockTeacher(req, res, next);
    }));
    router.delete("/remove-teacher/:id", auth_1.isAuth, (0, auth_1.role)([roles_1.default.ADMIN]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.adminController.removeTeacher(req, res, next);
    }));
    router.post("/add-student", auth_1.isAuth, (0, auth_1.role)([roles_1.default.ADMIN]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.adminController.addStudent(req, res, next);
    }));
    router.get("/get-students", auth_1.isAuth, (0, auth_1.role)([roles_1.default.ADMIN]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.adminController.getStudents(req, res, next);
    }));
    router.put("/block-student/:id", auth_1.isAuth, (0, auth_1.role)([roles_1.default.ADMIN]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.adminController.blockStudent(req, res, next);
    }));
    router.delete("/remove-student/:id", auth_1.isAuth, (0, auth_1.role)([roles_1.default.ADMIN]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.adminController.removeStudent(req, res, next);
    }));
    router.post("/add-course", auth_1.isAuth, (0, auth_1.role)([roles_1.default.ADMIN]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.adminController.addCourse(req, res, next);
    }));
    router.get("/get-courses", auth_1.isAuth, (0, auth_1.role)([roles_1.default.ADMIN]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.adminController.getCourses(req, res, next);
    }));
    router.delete("/remove-course/:id", auth_1.isAuth, (0, auth_1.role)([roles_1.default.ADMIN]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.adminController.removeCourse(req, res, next);
    }));
    router.put("/update-course/:id", auth_1.isAuth, (0, auth_1.role)([roles_1.default.ADMIN]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.adminController.updateCourseDetails(req, res, next);
    }));
    router.get("/get-admin/:id", auth_1.isAuth, (0, auth_1.role)([roles_1.default.ADMIN]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.adminController.getAdminProfile(req, res, next);
    }));
    router.put("/update-admin/:id", auth_1.isAuth, (0, auth_1.role)([roles_1.default.ADMIN]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.adminController.updateAdminProfile(req, res, next);
    }));
    router.post("/add-batch", auth_1.isAuth, (0, auth_1.role)([roles_1.default.ADMIN]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.adminController.addBatch(req, res, next);
    }));
    router.get("/get-batches", auth_1.isAuth, (0, auth_1.role)([roles_1.default.ADMIN]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.adminController.getBatches(req, res, next);
    }));
    router.delete("/remove-batch/:id", auth_1.isAuth, (0, auth_1.role)([roles_1.default.ADMIN]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.adminController.removeBatch(req, res, next);
    }));
    router.post("/add-announcement", auth_1.isAuth, (0, auth_1.role)([roles_1.default.ADMIN]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.adminController.addAnnouncement(req, res, next);
    }));
    router.get("/get-announcements", auth_1.isAuth, (0, auth_1.role)([roles_1.default.ADMIN]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.adminController.getAnnouncements(req, res, next);
    }));
    router.delete("/remove-announcement/:id", auth_1.isAuth, (0, auth_1.role)([roles_1.default.ADMIN]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.adminController.removeAnnouncement(req, res, next);
    }));
    router.get("/get-teachers-leaves", auth_1.isAuth, (0, auth_1.role)([roles_1.default.ADMIN]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.adminController.getTeachersLeaves(req, res, next);
    }));
    router.get("/get-students-leaves", auth_1.isAuth, (0, auth_1.role)([roles_1.default.ADMIN]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.adminController.getStudentsLeaves(req, res, next);
    }));
    router.put("/update-teacher-leave-status", auth_1.isAuth, (0, auth_1.role)([roles_1.default.ADMIN]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.adminController.updateTeachersLeaveStatus(req, res, next);
    }));
    router.put("/update-student-leave-status", auth_1.isAuth, (0, auth_1.role)([roles_1.default.ADMIN]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.adminController.updateStudentsLeaveStatus(req, res, next);
    }));
    router.post("/add-timetable", auth_1.isAuth, (0, auth_1.role)([roles_1.default.ADMIN]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.adminController.addTimetable(req, res, next);
    }));
    router.get("/get-timetable", auth_1.isAuth, (0, auth_1.role)([roles_1.default.ADMIN]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.adminController.getTimetables(req, res, next);
    }));
    router.delete("/remove-timetable/:id", auth_1.isAuth, (0, auth_1.role)([roles_1.default.ADMIN]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.adminController.deleteTimetable(req, res, next);
    }));
    router.get("/get-attendence", auth_1.isAuth, (0, auth_1.role)([roles_1.default.ADMIN]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.adminController.getAtendence(req, res, next);
    }));
    return router;
};
exports.adminRoute = adminRoute;
//# sourceMappingURL=adminRoutes.js.map