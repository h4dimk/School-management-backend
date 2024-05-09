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
exports.getStudentById = void 0;
const errorHandler_1 = __importDefault(require("../../../../useCases/middlewares/errorHandler"));
const studentModel_1 = __importDefault(require("../../models/studentModel"));
const getStudentById = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield studentModel_1.default.findById(studentId);
        if (!student) {
            throw new errorHandler_1.default(404, "Student not found");
        }
        return student;
    }
    catch (error) {
        console.error("Error retrieving student by ID:", error);
        throw new errorHandler_1.default(500, "Internal server error");
    }
});
exports.getStudentById = getStudentById;
//# sourceMappingURL=getStudentById.js.map