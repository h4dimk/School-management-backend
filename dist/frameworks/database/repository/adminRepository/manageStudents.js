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
exports.removeStudent = exports.blockStudent = void 0;
const studentModel_1 = __importDefault(require("../../models/studentModel"));
const blockStudent = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield studentModel_1.default.findById(studentId);
        if (!student) {
            throw new Error("Teacher not found");
        }
        student.isActive = !student.isActive;
        yield student.save();
        return student.isActive;
    }
    catch (error) {
        console.error("Error blocking student:", error);
        throw new Error("Failed to block student");
    }
});
exports.blockStudent = blockStudent;
const removeStudent = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedStudent = yield studentModel_1.default.findByIdAndDelete(studentId);
        if (!deletedStudent) {
            throw new Error("Student not found");
        }
        return deletedStudent;
    }
    catch (error) {
        console.error("Error removing student:", error);
        throw new Error("Failed to remove student");
    }
});
exports.removeStudent = removeStudent;
//# sourceMappingURL=manageStudents.js.map