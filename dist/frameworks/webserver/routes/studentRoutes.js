"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentRoute = void 0;
const roles_1 = __importDefault(require("../../../@types/enum/roles"));
const auth_1 = require("../middlewares/auth");
const catchAsyncErrors_1 = require("../middlewares/catchAsyncErrors");
const injuctions_1 = require("./injuctions/injuctions");
const studentRoute = (router) => {
    router.post("/login", (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.studentController.login(req, res, next);
    }));
    router.get("/get-student/:id", auth_1.isAuth, (0, auth_1.role)([roles_1.default.STUDENT]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.studentController.getStudentProfile(req, res, next);
    }));
    router.put("/update-student/:id", auth_1.isAuth, (0, auth_1.role)([roles_1.default.STUDENT]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.studentController.updateStudentProfile(req, res, next);
    }));
    router.get("/get-announcements", auth_1.isAuth, (0, auth_1.role)([roles_1.default.STUDENT]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.studentController.getAnnouncements(req, res, next);
    }));
    router.post("/apply-leave/:id", auth_1.isAuth, (0, auth_1.role)([roles_1.default.STUDENT]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.studentController.applyLeave(req, res, next);
    }));
    router.get("/get-leaves/:id", auth_1.isAuth, (0, auth_1.role)([roles_1.default.STUDENT]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.studentController.getLeaves(req, res, next);
    }));
    router.delete("/cancel-leave/:id", auth_1.isAuth, (0, auth_1.role)([roles_1.default.STUDENT]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.studentController.cancelLeave(req, res, next);
    }));
    router.post("/add-message", auth_1.isAuth, (0, auth_1.role)([roles_1.default.STUDENT]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.studentController.addMessage(req, res, next);
    }));
    router.get("/get-chats/:id", auth_1.isAuth, (0, auth_1.role)([roles_1.default.STUDENT]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.studentController.getChats(req, res, next);
    }));
    router.get("/get-timetable/:id", auth_1.isAuth, (0, auth_1.role)([roles_1.default.STUDENT]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.studentController.getTimetables(req, res, next);
    }));
    router.get("/get-mcqs-batch/:id", auth_1.isAuth, (0, auth_1.role)([roles_1.default.STUDENT]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.studentController.getMcqsByBatch(req, res, next);
    }));
    router.post("/submit-answer", auth_1.isAuth, (0, auth_1.role)([roles_1.default.STUDENT]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.studentController.submitAnswer(req, res, next);
    }));
    router.post("/upload-assignment", auth_1.isAuth, (0, auth_1.role)([roles_1.default.STUDENT]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.studentController.addAssignment(req, res, next);
    }));
    router.get("/get-assignments/:id", auth_1.isAuth, (0, auth_1.role)([roles_1.default.STUDENT]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.studentController.getAssignmentsStudents(req, res, next);
    }));
    router.get("/get-answered-mcqs/:id", auth_1.isAuth, (0, auth_1.role)([roles_1.default.STUDENT]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.studentController.getAnsweredMcqsById(req, res, next);
    }));
    router.get("/get-remarks/:id", auth_1.isAuth, (0, auth_1.role)([roles_1.default.STUDENT]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.studentController.getRemarks(req, res, next);
    }));
    router.get("/get-attendances/:id", auth_1.isAuth, (0, auth_1.role)([roles_1.default.STUDENT]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.studentController.getAttendence(req, res, next);
    }));
    router.get("/get-batch-ranks/:id", auth_1.isAuth, (0, auth_1.role)([roles_1.default.STUDENT]), (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => {
        injuctions_1.studentController.getBatchRanks(req, res, next);
    }));
    return router;
};
exports.studentRoute = studentRoute;
//# sourceMappingURL=studentRoutes.js.map