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
exports.findAnsweredMCQs = exports.createMcqSubmit = exports.findbyBatchMcqs = void 0;
const mcqModel_1 = __importDefault(require("../../models/mcqModel"));
const mcqSubmitModel_1 = __importDefault(require("../../models/mcqSubmitModel"));
const findbyBatchMcqs = (batchId, studentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mcqs = yield mcqModel_1.default.find({ batchId });
        const mcqSubmissions = yield mcqSubmitModel_1.default.find({
            studentId,
            mcqId: { $in: mcqs.map((mcq) => mcq._id) },
        });
        const remainingMcqs = mcqs.filter((mcq) => !mcqSubmissions.some((submission) => submission.mcqId.equals(mcq._id)));
        return remainingMcqs;
    }
    catch (error) {
        console.error("Error occurred while fetching Mcqs:", error);
        throw new Error("Failed to fetch Mcqs");
    }
});
exports.findbyBatchMcqs = findbyBatchMcqs;
const createMcqSubmit = (mcqSubmitDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdMcqSubmit = yield mcqSubmitModel_1.default.create(mcqSubmitDetails);
        return createdMcqSubmit;
    }
    catch (error) {
        console.error("Error occurred while creating McqsSubmit:", error);
        throw new Error("Failed to creating McqsSubmit");
    }
});
exports.createMcqSubmit = createMcqSubmit;
const findAnsweredMCQs = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mcqSubmissions = yield mcqSubmitModel_1.default.find({ studentId }).populate('mcqId');
        // const answeredMcqIds = mcqSubmissions.map((submission) => submission.mcqId);
        // const answeredMcqs = await mcqModel.find({ _id: { $in: answeredMcqIds } });
        return mcqSubmissions;
    }
    catch (error) {
        console.error("Error occurred while fetching answered MCQs:", error);
        throw new Error("Failed to fetch answered MCQs");
    }
});
exports.findAnsweredMCQs = findAnsweredMCQs;
//# sourceMappingURL=manageMcqs.js.map