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
exports.addStudentBatch = void 0;
const errorHandler_1 = __importDefault(require("../../../../useCases/middlewares/errorHandler"));
const batchModel_1 = __importDefault(require("../../models/batchModel"));
const addStudentBatch = (batchId, studentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!batchId) {
            throw new errorHandler_1.default(400, "Batch ID is required");
        }
        const updatedBatch = yield batchModel_1.default.findByIdAndUpdate(batchId, { $push: { students: studentId } }, { new: true });
        if (!updatedBatch) {
            throw new errorHandler_1.default(404, "Batch not found");
        }
        return updatedBatch;
    }
    catch (error) {
        console.error("Error updating batch:", error);
        throw new errorHandler_1.default(500, "Failed to update batch");
    }
});
exports.addStudentBatch = addStudentBatch;
//# sourceMappingURL=addStudentBatches.js.map