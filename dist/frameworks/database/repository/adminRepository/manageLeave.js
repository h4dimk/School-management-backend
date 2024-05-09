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
exports.updateTeachersLeaveStatus = exports.updateStudentsLeaveStatus = exports.findStudentsLeaves = exports.findTeachersLeaves = void 0;
const leaveTeacherModel_1 = __importDefault(require("../../models/leaveTeacherModel"));
const leaveStudentModel_1 = __importDefault(require("../../models/leaveStudentModel"));
const findTeachersLeaves = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const leaves = yield leaveTeacherModel_1.default.find().populate("teacher");
        return leaves;
    }
    catch (error) {
        console.error("Error fetching teachers leaves:", error);
        throw new Error("Failed to fetch leaves");
    }
});
exports.findTeachersLeaves = findTeachersLeaves;
const findStudentsLeaves = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const leaves = yield leaveStudentModel_1.default.find().populate("student");
        return leaves;
    }
    catch (error) {
        console.error("Error fetching students leaves:", error);
        throw new Error("Failed to fetch leaves");
    }
});
exports.findStudentsLeaves = findStudentsLeaves;
const updateStudentsLeaveStatus = (leaveId, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const leave = yield leaveStudentModel_1.default.findById(leaveId);
        if (!leave) {
            throw new Error("Leave not found");
        }
        leave.status = status;
        yield leave.save();
    }
    catch (error) {
        console.error("Error updating leave status:", error);
        throw new Error("Failed to update leave");
    }
});
exports.updateStudentsLeaveStatus = updateStudentsLeaveStatus;
const updateTeachersLeaveStatus = (leaveId, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const leave = yield leaveTeacherModel_1.default.findById(leaveId);
        if (!leave) {
            throw new Error("Leave not found");
        }
        leave.status = status;
        yield leave.save();
    }
    catch (error) {
        console.error("Error updating leave status:", error);
        throw new Error("Failed to update leave");
    }
});
exports.updateTeachersLeaveStatus = updateTeachersLeaveStatus;
//# sourceMappingURL=manageLeave.js.map