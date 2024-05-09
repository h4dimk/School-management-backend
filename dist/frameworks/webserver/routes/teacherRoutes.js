"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teacherRoute = void 0;
const roles_1 = __importDefault(require("../../../@types/enum/roles"));
const auth_1 = require("../middlewares/auth");
const catchAsyncErrors_1 = require("../middlewares/catchAsyncErrors");
const injuctions_1 = require("./injuctions/injuctions");
const teacherRoute = (router) => {
    router.post("/login", (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.teacherController.login(req, res, next);
    }));
    router.get("/get-teacher/:id", auth_1.isAuth, (0, auth_1.role)([roles_1.default.TEACHER]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.teacherController.getTeacherProfile(req, res, next);
    }));
    router.put("/update-teacher/:id", auth_1.isAuth, (0, auth_1.role)([roles_1.default.TEACHER]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.teacherController.updateTeacherProfile(req, res, next);
    }));
    router.get("/get-announcements", auth_1.isAuth, (0, auth_1.role)([roles_1.default.TEACHER]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.teacherController.getAnnouncements(req, res, next);
    }));
    router.post("/add-attendence", auth_1.isAuth, (0, auth_1.role)([roles_1.default.TEACHER]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.teacherController.uploadAttendance(req, res, next);
    }));
    router.get("/get-attendances/:id", auth_1.isAuth, (0, auth_1.role)([roles_1.default.TEACHER]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.teacherController.getAttendance(req, res, next);
    }));
    router.post("/apply-leave/:id", auth_1.isAuth, (0, auth_1.role)([roles_1.default.TEACHER]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.teacherController.applyLeave(req, res, next);
    }));
    router.get("/get-leaves/:id", auth_1.isAuth, (0, auth_1.role)([roles_1.default.TEACHER]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.teacherController.getLeaves(req, res, next);
    }));
    router.delete("/cancel-leave/:id", auth_1.isAuth, (0, auth_1.role)([roles_1.default.TEACHER]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.teacherController.cancelLeave(req, res, next);
    }));
    router.get("/get-students-leaves", auth_1.isAuth, (0, auth_1.role)([roles_1.default.TEACHER]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.teacherController.getStudentsLeaves(req, res, next);
    }));
    router.put("/update-student-leave-status", auth_1.isAuth, (0, auth_1.role)([roles_1.default.TEACHER]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.teacherController.updateStudentsLeaveStatus(req, res, next);
    }));
    router.get("/get-timetable/:id", auth_1.isAuth, (0, auth_1.role)([roles_1.default.TEACHER]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.teacherController.getTimetables(req, res, next);
    }));
    router.post("/add-mcq", auth_1.isAuth, (0, auth_1.role)([roles_1.default.TEACHER]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.teacherController.addMcq(req, res, next);
    }));
    router.get("/get-mcqs-teacher/:id", auth_1.isAuth, (0, auth_1.role)([roles_1.default.TEACHER]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.teacherController.getMcqsForTeacher(req, res, next);
    }));
    router.get("/get-mcqs-batch/:id", auth_1.isAuth, (0, auth_1.role)([roles_1.default.TEACHER]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.teacherController.getMcqsByBatch(req, res, next);
    }));
    router.get("/get-assignments/:id", auth_1.isAuth, (0, auth_1.role)([roles_1.default.TEACHER]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.teacherController.getAssignmentsBatch(req, res, next);
    }));
    // router.post(
    //   "/add-message",
    //   isAuth,
    //   role([Role.TEACHER]),
    //   catchAsyncErrors((req: Req, res: Res, next: Next) => {
    //     teacherController.addMessage(req, res, next);
    //   })
    // );
    router.get("/get-chats/:id", auth_1.isAuth, (0, auth_1.role)([roles_1.default.TEACHER]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.teacherController.getChats(req, res, next);
    }));
    router.post("/add-remarks", auth_1.isAuth, (0, auth_1.role)([roles_1.default.TEACHER]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.teacherController.addRemark(req, res, next);
    }));
    router.get("/get-remarks/:id", auth_1.isAuth, (0, auth_1.role)([roles_1.default.TEACHER]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.teacherController.getRemarks(req, res, next);
    }));
    router.get("/get-batches", auth_1.isAuth, (0, auth_1.role)([roles_1.default.TEACHER]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.teacherController.getBatches(req, res, next);
    }));
    router.get("/get-batch-ranks/:id", auth_1.isAuth, (0, auth_1.role)([roles_1.default.TEACHER]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.teacherController.getBatchRanks(req, res, next);
    }));
    return router;
};
exports.teacherRoute = teacherRoute;
//# sourceMappingURL=teacherRoutes.js.map