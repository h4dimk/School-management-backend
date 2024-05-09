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
exports.alreadyAssignedTeacher = exports.existingTimetable = exports.validateTimetableDate = exports.findTimetables = exports.deleteTimetable = exports.createTimetable = void 0;
const timetableModel_1 = __importDefault(require("../../models/timetableModel"));
const createTimetable = (timetable) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdTimetable = yield timetableModel_1.default.create(timetable);
        return createdTimetable;
    }
    catch (error) {
        console.error("Error creating timetable:", error);
        throw new Error("Failed to create timetable");
    }
});
exports.createTimetable = createTimetable;
const deleteTimetable = (timetableId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTimetable = yield timetableModel_1.default.findByIdAndDelete(timetableId);
        if (!deletedTimetable) {
            throw new Error("timetable not found");
        }
        return deletedTimetable;
    }
    catch (error) {
        console.error("Error removing timetable:", error);
        throw new Error("Failed to remove timetable");
    }
});
exports.deleteTimetable = deleteTimetable;
const findTimetables = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const timetables = yield timetableModel_1.default
            .find()
            .populate("batch")
            .populate("teacher");
        return timetables;
    }
    catch (error) {
        console.error("Error occurred while fetching timetable:", error);
        throw new Error("Failed to fetch timetable");
    }
});
exports.findTimetables = findTimetables;
// Validations
const validateTimetableDate = (date) => __awaiter(void 0, void 0, void 0, function* () {
    const currentDate = new Date();
    if (new Date(date) < currentDate) {
        const message = "The date cannot be in the past.";
        return message;
    }
});
exports.validateTimetableDate = validateTimetableDate;
const existingTimetable = (period, date, batch) => __awaiter(void 0, void 0, void 0, function* () {
    const existingTimetable = yield timetableModel_1.default.findOne({
        period,
        date,
        batch,
    });
    if (existingTimetable) {
        const message = `A timetable with this period and date already exists for this batch`;
        return message;
    }
});
exports.existingTimetable = existingTimetable;
const alreadyAssignedTeacher = (period, date, teacher) => __awaiter(void 0, void 0, void 0, function* () {
    const alreadyAssignedTeacher = yield timetableModel_1.default.findOne({
        period,
        date,
        teacher,
    });
    if (alreadyAssignedTeacher) {
        const message = `The teacher is already scheduled for a batch during this period. Please choose a different period or teacher.`;
        return message;
    }
});
exports.alreadyAssignedTeacher = alreadyAssignedTeacher;
//# sourceMappingURL=manageTimetable.js.map