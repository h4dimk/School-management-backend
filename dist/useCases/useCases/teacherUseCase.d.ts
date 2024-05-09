import { ITeacherRepository } from "../interface/repository/teacherRepository";
import { ITeacherUseCase } from "../interface/useCase/teacherUseCase";
import { ITeacher } from "../../entities/teacherEntity";
import IJwtService from "../interface/services/jwtService";
import { Next } from "../../frameworks/types/serverPackageTypes";
import { IHashpassword } from "../interface/services/hashPassword";
import { IAnnouncement } from "../../entities/announcementEntity";
import { IAttendence } from "../../entities/attendenceEntity";
import { ILeaveTeacher } from "../../entities/leaveTeacherEntity";
import { ILeaveStudent } from "../../entities/leaveStudentEntity";
import Leave from "../../@types/enum/leave";
import { ITimetable } from "../../entities/timeTableEntity";
import { IMcq } from "../../entities/mcqEntity";
import { IAssignment } from "../../entities/assignmentEntity";
import { IMessage } from "../../entities/chatEntity";
import { IRemark } from "../../entities/remarksEntity";
import { IBatch } from "../../entities/batchEntity";
import { IMcqSubmission } from "../../entities/mcqSubmits";
export declare class TeacherUseCase implements ITeacherUseCase {
    private readonly teacherRepository;
    private readonly jwt;
    private readonly hashPassword;
    constructor(teacherRepository: ITeacherRepository, jwt: IJwtService, hashedPassword: IHashpassword);
    login(email: string, password: string, next: Next): Promise<{
        teacher: ITeacher;
        token: string;
    } | void>;
    getTeacherProfile(teacherId: string): Promise<ITeacher | null>;
    updateTeacherProfile(teacherId: string, updates: Partial<ITeacher>): Promise<ITeacher>;
    getAnnouncements(next: Next): Promise<IAnnouncement[]>;
    addAttendance(attendance: IAttendence, next: Next): Promise<IAttendence | undefined>;
    getAttendance(batchId: string, next: Next): Promise<IAttendence[]>;
    applyLeave(leaveData: ILeaveTeacher, next: Next): Promise<ILeaveTeacher | undefined>;
    getLeaves(studentId: string): Promise<ILeaveTeacher[]>;
    cancelLeave(leaveId: string): Promise<void>;
    getStudentsLeaves(batch: string, next: Next): Promise<ILeaveStudent[]>;
    updateLeaveStatus(leaveId: string, status: Leave, next: Next): Promise<void>;
    getTimetables(teacherId: string, next: Next): Promise<ITimetable[]>;
    addMcq(mcqDetails: IMcq, next: Next): Promise<void>;
    findMcqsByTeacher(teacherId: string, next: Next): Promise<IMcq[]>;
    findMcqsByBatch(batchId: string, next: Next): Promise<IMcq[]>;
    getAssignments(batchId: string, next: Next): Promise<IAssignment[]>;
    addMessage(messageData: IMessage): Promise<IMessage>;
    getChats(batchId: string): Promise<IMessage[]>;
    addRemarks(remarks: IRemark): Promise<IRemark>;
    getRemarks(teacherId: string): Promise<IRemark[]>;
    getBatches(): Promise<IBatch[]>;
    getBatchRanks(batchId: string, next: Next): Promise<IMcqSubmission[]>;
}
