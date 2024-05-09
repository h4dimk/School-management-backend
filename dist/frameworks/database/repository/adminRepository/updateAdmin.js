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
exports.updateAdmin = void 0;
const errorHandler_1 = __importDefault(require("../../../../useCases/middlewares/errorHandler"));
const adminModel_1 = __importDefault(require("../../models/adminModel"));
const updateAdmin = (adminId, updatedAdmin) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!adminId) {
            throw new errorHandler_1.default(400, "Admin ID is required");
        }
        const admin = yield adminModel_1.default.findByIdAndUpdate(adminId, updatedAdmin, {
            new: true,
        });
        if (!admin) {
            throw new errorHandler_1.default(404, "Admin not found");
        }
        return admin;
    }
    catch (error) {
        console.error("Error updating admin:", error);
        throw new errorHandler_1.default(500, "Failed to update admin");
    }
});
exports.updateAdmin = updateAdmin;
//# sourceMappingURL=updateAdmin.js.map