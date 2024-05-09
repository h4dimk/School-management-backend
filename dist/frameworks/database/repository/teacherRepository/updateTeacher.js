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
exports.updateTeacher = void 0;
const errorHandler_1 = __importDefault(require("../../../../useCases/middlewares/errorHandler"));
const teacherModel_1 = __importDefault(require("../../models/teacherModel"));
const updateTeacher = (teacherId, updatedTeacher) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!teacherId) {
            throw new errorHandler_1.default(400, "Teacher ID is required");
        }
        const teacher = yield teacherModel_1.default.findByIdAndUpdate(teacherId, updatedTeacher, {
            new: true,
        });
        if (!teacher) {
            throw new errorHandler_1.default(404, "Teacher not found");
        }
        return teacher;
    }
    catch (error) {
        console.error("Error updating teacher:", error);
        throw new errorHandler_1.default(500, "Failed to update teacher");
    }
});
exports.updateTeacher = updateTeacher;
//# sourceMappingURL=updateTeacher.js.map