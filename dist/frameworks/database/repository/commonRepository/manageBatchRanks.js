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
exports.getBatchRanks = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mcqSubmitModel_1 = __importDefault(require("../../models/mcqSubmitModel"));
const getBatchRanks = (batchId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = new mongoose_1.default.Types.ObjectId(batchId);
        const topPerformingStudents = yield mcqSubmitModel_1.default.aggregate([
            {
                $match: {
                    batchId: id,
                    isCorrect: true,
                },
            },
            {
                $group: {
                    _id: "$studentId",
                    totalCorrect: { $sum: 1 },
                },
            },
            {
                $sort: { totalCorrect: -1 },
            },
            {
                $project: {
                    studentDetails: "$_id",
                    totalCorrect: 1,
                    _id: 0,
                },
            },
        ]);
        const studentIds = topPerformingStudents.map((result) => result.studentDetails);
        const populatedStudents = yield mcqSubmitModel_1.default.populate(topPerformingStudents, { path: "studentDetails", model: "Student" });
        return populatedStudents;
    }
    catch (error) {
        console.error("Error fetching top-performing students:", error);
        throw new Error("Failed to fetch top-performing students");
    }
});
exports.getBatchRanks = getBatchRanks;
//# sourceMappingURL=manageBatchRanks.js.map