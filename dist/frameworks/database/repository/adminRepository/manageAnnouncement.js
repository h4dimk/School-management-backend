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
exports.getAnnouncements = exports.removeAnnouncement = exports.addAnnouncement = void 0;
const announcementModel_1 = __importDefault(require("../../models/announcementModel"));
const addAnnouncement = (announcementData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const savedAnnouncement = yield announcementModel_1.default.create(announcementData);
        return savedAnnouncement;
    }
    catch (error) {
        console.error("Error adding announcement:", error);
        throw new Error("Failed to add announcement");
    }
});
exports.addAnnouncement = addAnnouncement;
const removeAnnouncement = (announcementId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedAnnouncement = yield announcementModel_1.default.findByIdAndDelete(announcementId);
        if (!deletedAnnouncement) {
            throw new Error("Announcement not found");
        }
        return deletedAnnouncement;
    }
    catch (error) {
        console.error("Error removing announcement:", error);
        throw new Error("Failed to remove announcement");
    }
});
exports.removeAnnouncement = removeAnnouncement;
const getAnnouncements = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const announcements = yield announcementModel_1.default.find();
        return announcements;
    }
    catch (error) {
        console.error("Error occurred while fetching announcements:", error);
        throw new Error("Failed to fetch announcements");
    }
});
exports.getAnnouncements = getAnnouncements;
//# sourceMappingURL=manageAnnouncement.js.map