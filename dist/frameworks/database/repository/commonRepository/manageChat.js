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
exports.findChats = exports.createMessage = void 0;
const chatModel_1 = __importDefault(require("../../models/chatModel"));
const createMessage = (messageData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdMessage = yield chatModel_1.default.create(messageData);
        return createdMessage;
    }
    catch (error) {
        console.error("Error creating Leave:", error);
        throw new Error("Failed to create Leave");
    }
});
exports.createMessage = createMessage;
const findChats = (batchId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chats = yield chatModel_1.default.find({ group: batchId }).populate("sender");
        return chats;
    }
    catch (error) {
        console.error("Error finding chats in groups:", error);
        throw new Error("Failed to find chats in groups");
    }
});
exports.findChats = findChats;
//# sourceMappingURL=manageChat.js.map