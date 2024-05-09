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
import Leave from "../../../../@types/enum/leave";
import { ILeaveTeacher } from "../../../../entities/leaveTeacherEntity";
export declare const createLeave: (leaveData: ILeaveTeacher) => Promise<import("mongoose").Document<unknown, {}, ILeaveTeacher> & ILeaveTeacher & Required<{
    _id: string;
}>>;
export declare const findLeavebyTeacherId: (teacherId: string) => Promise<(import("mongoose").Document<unknown, {}, ILeaveTeacher> & ILeaveTeacher & Required<{
    _id: string;
}>)[]>;
export declare const removeLeave: (leaveId: string) => Promise<import("mongoose").Document<unknown, {}, ILeaveTeacher> & ILeaveTeacher & Required<{
    _id: string;
}>>;
export declare const findStudentsLeaves: (batch: string) => Promise<Omit<import("mongoose").Document<unknown, {}, import("../../../../entities/leaveStudentEntity").ILeaveStudent> & import("../../../../entities/leaveStudentEntity").ILeaveStudent & Required<{
    _id: string;
}>, never>[]>;
export declare const updateLeaveStatus: (leaveId: string, status: Leave) => Promise<void>;
