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
exports.getAdminById = void 0;
const errorHandler_1 = __importDefault(require("../../../../useCases/middlewares/errorHandler"));
const adminModel_1 = __importDefault(require("../../models/adminModel"));
const getAdminById = (adminId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield adminModel_1.default.findById(adminId);
        if (!admin) {
            throw new errorHandler_1.default(404, "Admin not found");
        }
        return admin;
    }
    catch (error) {
        console.error("Error retrieving admin by ID:", error);
        throw new errorHandler_1.default(500, "Internal server error");
    }
});
exports.getAdminById = getAdminById;
//# sourceMappingURL=getAdminById.js.map