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
exports.getAttendence = void 0;
const attendenceModel_1 = __importDefault(require("../../models/attendenceModel"));
const getAttendence = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to the beginning of the day
        // Find all attendance records for today
        const attendanceRecords = yield attendenceModel_1.default.find({
            date: { $gte: today }, // Find records with date greater than or equal to today
        });
        // Initialize arrays to store present and absent students
        const allPresent = [];
        const allAbsent = [];
        // Iterate through each attendance record
        attendanceRecords.forEach((attendance) => {
            // Convert Types.ObjectId[] to string[] for present and absent students
            const present = attendance.present.map((id) => id.toString());
            const absent = attendance.absent.map((id) => id.toString());
            // Concatenate present and absent students from all attendance records
            allPresent.push(...present);
            allAbsent.push(...absent);
        });
        return { present: allPresent, absent: allAbsent };
    }
    catch (error) {
        console.error("Error fetching attendance:", error);
        throw new Error("Failed to fetch attendance");
    }
});
exports.getAttendence = getAttendence;
//# sourceMappingURL=manageAttendence.js.map