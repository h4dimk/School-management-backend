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
exports.removeBatch = exports.addBatch = exports.getBatches = void 0;
const batchModel_1 = __importDefault(require("../../models/batchModel"));
const getBatches = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const batches = yield batchModel_1.default.find().populate("students");
        return batches;
    }
    catch (error) {
        console.error("Error occurred while fetching batches:", error);
        throw new Error("Failed to fetch batches");
    }
});
exports.getBatches = getBatches;
const addBatch = (batch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdBatch = yield batchModel_1.default.create(batch);
        return createdBatch;
    }
    catch (error) {
        console.error("Error creating batch:", error);
        throw new Error("Failed to create batch");
    }
});
exports.addBatch = addBatch;
const removeBatch = (batchId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedBatch = yield batchModel_1.default.findByIdAndDelete(batchId);
        if (!deletedBatch) {
            throw new Error("Batch not found");
        }
        return deletedBatch;
    }
    catch (error) {
        console.error("Error removing batch:", error);
        throw new Error("Failed to remove batch");
    }
});
exports.removeBatch = removeBatch;
//# sourceMappingURL=manageBatch.js.map