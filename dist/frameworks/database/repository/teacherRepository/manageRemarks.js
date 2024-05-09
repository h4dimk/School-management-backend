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
exports.findRemarks = exports.createRemark = void 0;
const remarkModel_1 = __importDefault(require("../../models/remarkModel"));
const createRemark = (remark) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdRemark = yield remarkModel_1.default.create(remark);
        return createdRemark;
    }
    catch (error) {
        console.error("Error creating remark:", error);
        throw new Error("Failed to create remark");
    }
});
exports.createRemark = createRemark;
const findRemarks = (teacherId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const remarks = remarkModel_1.default.find({ teacherId }).populate("batchId");
        return remarks;
    }
    catch (error) {
        console.error("Error finding Remarks:", error);
        throw new Error("Failed to find Remarks");
    }
});
exports.findRemarks = findRemarks;
//# sourceMappingURL=manageRemarks.js.map