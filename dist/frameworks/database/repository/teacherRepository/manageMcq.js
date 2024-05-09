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
exports.findbyBatchMcqs = exports.findbyTeacherMcqs = exports.createMcq = void 0;
const mcqModel_1 = __importDefault(require("../../models/mcqModel"));
const createMcq = (mcqDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdMcq = yield mcqModel_1.default.create(mcqDetails);
        return createdMcq;
    }
    catch (error) {
        console.error("Error creating MCQ:", error);
        throw new Error("Failed to create MCQ");
    }
});
exports.createMcq = createMcq;
const findbyTeacherMcqs = (teacherId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mcqs = yield mcqModel_1.default.find({ teacherId });
        return mcqs;
    }
    catch (error) {
        console.error("Error occurred while fetching Mcqs:", error);
        throw new Error("Failed to fetch Mcqs");
    }
});
exports.findbyTeacherMcqs = findbyTeacherMcqs;
const findbyBatchMcqs = (batchId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mcqs = yield mcqModel_1.default.find({ batchId });
        return mcqs;
    }
    catch (error) {
        console.error("Error occurred while fetching Mcqs:", error);
        throw new Error("Failed to fetch Mcqs");
    }
});
exports.findbyBatchMcqs = findbyBatchMcqs;
//# sourceMappingURL=manageMcq.js.map