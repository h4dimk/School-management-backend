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
import { Types } from "mongoose";
import { IAdmin } from "../../../entities/adminEntity";
import { IAnnouncement } from "../../../entities/announcementEntity";
import { IBatch } from "../../../entities/batchEntity";
import { ICourse } from "../../../entities/courseEntity";
import { IStudent } from "../../../entities/studentEntity";
import { ITeacher } from "../../../entities/teacherEntity";
import { ILeaveTeacher } from "../../../entities/leaveTeacherEntity";
import { ILeaveStudent } from "../../../entities/leaveStudentEntity";
import Leave from "../../../@types/enum/leave";
import { IGroup } from "../../../entities/groupEntity";
import { ITimetable } from "../../../entities/timeTableEntity";
export interface IAdminRepository {
    createTeacher(teacher: ITeacher): Promise<void>;
    createStudent(student: IStudent): Promise<IStudent>;
    createCourse(course: ICourse): Promise<void>;
    createGroup(groupData: IGroup): Promise<void>;
    createTimetable(timetable: ITimetable): Promise<void>;
    addBatch(batch: IBatch): Promise<void>;
    addAnnouncement(announcementData: IAnnouncement): Promise<void>;
    findByEmail(email: string): Promise<IAdmin | null>;
    findTeacher(email: string): Promise<ITeacher | null>;
    findStudent(email: string): Promise<IStudent | null>;
    findCourse(name: string): Promise<ICourse | null>;
    getTeachers(): Promise<ITeacher[]>;
    getStudents(): Promise<IStudent[]>;
    getCourse(): Promise<ICourse[]>;
    getBatches(): Promise<IBatch[]>;
    getAnnouncements(): Promise<IAnnouncement[]>;
    getTeachersLeaves(): Promise<ILeaveTeacher[]>;
    getStudentsLeaves(): Promise<ILeaveStudent[]>;
    getTimetables(): Promise<ITimetable[]>;
    fetchAttendence(): Promise<{
        present: string[];
        absent: string[];
    }>;
    blockTeacher(teacherId: string): Promise<boolean>;
    blockStudent(studentId: string): Promise<boolean>;
    removeTeacher(teacherId: string): Promise<void>;
    removeStudent(studentId: string): Promise<void>;
    removeCourse(courseId: string): Promise<void>;
    removeBatch(batchId: string): Promise<void>;
    removeAnnouncement(announcementId: string): Promise<void>;
    removeTimetable(timetableId: string): Promise<void>;
    getAdminById(id: string): Promise<IAdmin | null>;
    updateAdmin(adminId: string, admin: Partial<IAdmin>): Promise<IAdmin>;
    updateBatch(batchId: Types.ObjectId, studentId: string): Promise<IBatch | null>;
    updateTeachersLeaveStatus(leaveId: string, status: Leave): Promise<void>;
    updateStudentsLeaveStatus(leaveId: string, status: Leave): Promise<void>;
    updateCourse(courseId: string, updatedCourse: Partial<ICourse>): Promise<ICourse>;
    validateTimeTable(date: Date, period: number, batch: string, teacher: string): Promise<string | undefined>;
}
