/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { ITimetable } from "../../../../entities/timeTableEntity";
export declare const createTimetable: (timetable: ITimetable) => Promise<import("mongoose").Document<unknown, {}, ITimetable> & ITimetable & Required<{
    _id: string;
}>>;
export declare const deleteTimetable: (timetableId: string) => Promise<import("mongoose").Document<unknown, {}, ITimetable> & ITimetable & Required<{
    _id: string;
}>>;
export declare const findTimetables: () => Promise<Omit<Omit<import("mongoose").Document<unknown, {}, ITimetable> & ITimetable & Required<{
    _id: string;
}>, never>, never>[]>;
export declare const validateTimetableDate: (date: Date) => Promise<"The date cannot be in the past." | undefined>;
export declare const existingTimetable: (period: number, date: Date, batch: string) => Promise<"A timetable with this period and date already exists for this batch" | undefined>;
export declare const alreadyAssignedTeacher: (period: number, date: Date, teacher: string) => Promise<"The teacher is already scheduled for a batch during this period. Please choose a different period or teacher." | undefined>;
