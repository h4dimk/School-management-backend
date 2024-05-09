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
exports.addMemberToGroup = exports.findGroup = exports.createGroup = void 0;
const groupModel_1 = __importDefault(require("../../models/groupModel"));
const createGroup = (groupData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdGroup = yield groupModel_1.default.create(groupData);
        return createdGroup;
    }
    catch (error) {
        console.error("Error creating Group:", error);
        throw new Error("Failed to create Group");
    }
});
exports.createGroup = createGroup;
const findGroup = (batchId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const group = yield groupModel_1.default.findOne({ batchId });
        return group;
    }
    catch (error) {
        console.error("Error finding Group:", error);
        throw new Error("Failed to find Group");
    }
});
exports.findGroup = findGroup;
const addMemberToGroup = (groupId, memberId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const group = yield groupModel_1.default.findById(groupId);
        if (!group) {
            throw new Error("Group not found");
        }
        group.members.push(memberId);
        const updatedGroup = yield group.save();
        return updatedGroup;
    }
    catch (error) {
        console.error("Error adding member to group:", error);
        throw new Error("Failed to add member to group");
    }
});
exports.addMemberToGroup = addMemberToGroup;
//# sourceMappingURL=manageGroup.js.map