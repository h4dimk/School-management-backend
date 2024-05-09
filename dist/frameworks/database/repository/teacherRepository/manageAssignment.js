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
exports.findAssignmentbyBatchId = void 0;
const errorHandler_1 = __importDefault(require("../../../../useCases/middlewares/errorHandler"));
const assignmentModel_1 = __importDefault(require("../../models/assignmentModel"));
const findAssignmentbyBatchId = (batchId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const assignments = yield assignmentModel_1.default
            .find({ batch: batchId })
            .populate("student");
        return assignments;
    }
    catch (error) {
        console.error("Error retrieving assignments by student ID:", error);
        throw new errorHandler_1.default(500, "Internal server error");
    }
});
exports.findAssignmentbyBatchId = findAssignmentbyBatchId;
//# sourceMappingURL=manageAssignment.js.map