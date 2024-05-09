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
exports.removeLeave = exports.findLeavebyStudentId = exports.createLeave = void 0;
const errorHandler_1 = __importDefault(require("../../../../useCases/middlewares/errorHandler"));
const leaveStudentModel_1 = __importDefault(require("../../models/leaveStudentModel"));
const createLeave = (leaveData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdLeave = yield leaveStudentModel_1.default.create(leaveData);
        return createdLeave;
    }
    catch (error) {
        console.error("Error creating Leave:", error);
        throw new Error("Failed to create Leave");
    }
});
exports.createLeave = createLeave;
const findLeavebyStudentId = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const leaves = yield leaveStudentModel_1.default.find({ student: studentId });
        return leaves;
    }
    catch (error) {
        console.error("Error retrieving leaves by student ID:", error);
        throw new errorHandler_1.default(500, "Internal server error");
    }
});
exports.findLeavebyStudentId = findLeavebyStudentId;
const removeLeave = (leaveId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const removedLeave = yield leaveStudentModel_1.default.findByIdAndDelete(leaveId);
        if (!removedLeave) {
            throw new Error("Leave not found");
        }
        return removedLeave;
    }
    catch (error) {
        console.error("Error removing leave:", error);
        throw new Error("Failed to remove leave");
    }
});
exports.removeLeave = removeLeave;
//# sourceMappingURL=manageLeave.js.map