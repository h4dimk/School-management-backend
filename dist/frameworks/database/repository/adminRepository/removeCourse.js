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
exports.upadateCourse = exports.removeCourse = void 0;
const errorHandler_1 = __importDefault(require("../../../../useCases/middlewares/errorHandler"));
const courseModel_1 = __importDefault(require("../../models/courseModel"));
const removeCourse = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedCourse = yield courseModel_1.default.findByIdAndDelete(courseId);
        if (!deletedCourse) {
            throw new Error("Course not found");
        }
        return deletedCourse;
    }
    catch (error) {
        console.error("Error removing course:", error);
        throw new Error("Failed to remove course");
    }
});
exports.removeCourse = removeCourse;
const upadateCourse = (courseId, updatedCourse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!courseId) {
            throw new errorHandler_1.default(400, "Course ID is required");
        }
        const editedCourse = yield courseModel_1.default.findByIdAndUpdate(courseId, updatedCourse, { new: true });
        return editedCourse;
    }
    catch (error) {
        console.error("Error updating Course:", error);
        throw new errorHandler_1.default(500, "Failed to update Course");
    }
});
exports.upadateCourse = upadateCourse;
//# sourceMappingURL=removeCourse.js.map