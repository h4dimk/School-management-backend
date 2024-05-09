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
exports.getTeacherById = void 0;
const errorHandler_1 = __importDefault(require("../../../../useCases/middlewares/errorHandler"));
const teacherModel_1 = __importDefault(require("../../models/teacherModel"));
const getTeacherById = (teacherId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teacher = yield teacherModel_1.default
            .findById(teacherId)
            .populate({
            path: "batchId",
            populate: {
                path: "students",
                model: "Student",
            },
        })
            .exec();
        if (!teacher) {
            throw new errorHandler_1.default(404, "Teacher not found");
        }
        return teacher;
    }
    catch (error) {
        console.error("Error retrieving teacher by ID:", error);
        throw new errorHandler_1.default(500, "Internal server error");
    }
});
exports.getTeacherById = getTeacherById;
//# sourceMappingURL=getTeacherById.js.map