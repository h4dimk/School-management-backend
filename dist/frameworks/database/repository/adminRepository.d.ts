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
/// <reference types="mongoose/types/inferschematype" />
import adminModel from "../models/adminModel";
import { IAdminRepository } from "../../../useCases/interface/repository/adminRepository";
import { IAdmin } from "../../../entities/adminEntity";
import { ITeacher } from "../../../entities/teacherEntity";
import { IStudent } from "../../../entities/studentEntity";
import { ICourse } from "../../../entities/courseEntity";
import { IBatch } from "../../../entities/batchEntity";
import { IAnnouncement } from "../../../entities/announcementEntity";
import { Types } from "mongoose";
import Leave from "../../../@types/enum/leave";
import { ILeaveTeacher } from "../../../entities/leaveTeacherEntity";
import { ILeaveStudent } from "../../../entities/leaveStudentEntity";
import { IGroup } from "../../../entities/groupEntity";
import { ITimetable } from "../../../entities/timeTableEntity";
export declare class AdminRepository implements IAdminRepository {
    private adminModels;
    constructor(adminModels: typeof adminModel);
    findByEmail(email: string): Promise<IAdmin | null>;
    createTeacher(teacher: ITeacher): Promise<void>;
    findTeacher(email: string): Promise<ITeacher | null>;
    getTeachers(): Promise<ITeacher[]>;
    blockTeacher(teacherId: string): Promise<boolean>;
    removeTeacher(teacherId: string): Promise<void>;
    createStudent(student: IStudent): Promise<IStudent>;
    findStudent(email: string): Promise<IStudent | null>;
    getStudents(): Promise<IStudent[]>;
    blockStudent(studentId: string): Promise<boolean>;
    removeStudent(studentId: string): Promise<void>;
    createCourse(course: ICourse): Promise<void>;
    findCourse(name: string): Promise<ICourse | null>;
    getCourse(): Promise<ICourse[]>;
    removeCourse(courseId: string): Promise<void>;
    updateCourse(courseId: string, updatedCourse: Partial<ICourse>): Promise<ICourse>;
    getAdminById(adminId: string): Promise<IAdmin | null>;
    updateAdmin(adminId: string, admin: Partial<IAdmin>): Promise<IAdmin>;
    addBatch(batch: IBatch): Promise<void>;
    getBatches(): Promise<IBatch[]>;
    removeBatch(batchId: string): Promise<void>;
    updateBatch(batchId: Types.ObjectId, studentId: string): Promise<IBatch | null>;
    addAnnouncement(announcementData: IAnnouncement): Promise<void>;
    removeAnnouncement(announcementId: string): Promise<void>;
    getAnnouncements(): Promise<IAnnouncement[]>;
    getTeachersLeaves(): Promise<ILeaveTeacher[]>;
    getStudentsLeaves(): Promise<ILeaveStudent[]>;
    updateTeachersLeaveStatus(leaveId: string, status: Leave): Promise<void>;
    updateStudentsLeaveStatus(leaveId: string, status: Leave): Promise<void>;
    createGroup(groupData: IGroup): Promise<void>;
    createTimetable(timetable: ITimetable): Promise<void>;
    removeTimetable(timetableId: string): Promise<void>;
    getTimetables(): Promise<ITimetable[]>;
    validateTimeTable(date: Date, period: number, batch: string, teacher: string): Promise<string | undefined>;
    fetchAttendence(): Promise<{
        present: string[];
        absent: string[];
    }>;
}
