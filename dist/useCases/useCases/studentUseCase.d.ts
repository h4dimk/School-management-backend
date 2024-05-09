import { IStudentRepository } from "../interface/repository/studentRepository";
import IJwtService from "../interface/services/jwtService";
import { IStudentUseCase } from "../interface/useCase/studentUseCase";
import { Next } from "../../frameworks/types/serverPackageTypes";
import { IHashpassword } from "../interface/services/hashPassword";
import { IStudent } from "../../entities/studentEntity";
import { IAnnouncement } from "../../entities/announcementEntity";
import { ILeaveStudent } from "../../entities/leaveStudentEntity";
import { IMessage } from "../../entities/chatEntity";
import { ITimetable } from "../../entities/timeTableEntity";
import { IMcq } from "../../entities/mcqEntity";
import { IMcqSubmission } from "../../entities/mcqSubmits";
import { IAssignment } from "../../entities/assignmentEntity";
import { IRemark } from "../../entities/remarksEntity";
export declare class StudentUseCase implements IStudentUseCase {
    private readonly studentRepository;
    private readonly jwt;
    private readonly hashPassword;
    constructor(studentRepository: IStudentRepository, jwt: IJwtService, hashPassword: IHashpassword);
    login(email: string, password: string, next: Next): Promise<{
        student: IStudent;
        token: string;
    } | void>;
    getStudentProfile(studentId: string): Promise<IStudent | null>;
    updateStudentProfile(studentId: string, updates: Partial<IStudent>): Promise<IStudent>;
    getAnnouncements(next: Next): Promise<IAnnouncement[]>;
    applyLeave(leaveData: ILeaveStudent, next: Next): Promise<ILeaveStudent | undefined>;
    getLeaves(studentId: string): Promise<ILeaveStudent[]>;
    cancelLeave(leaveId: string): Promise<void>;
    addMessage(messageData: IMessage): Promise<IMessage>;
    getChats(batchId: string): Promise<IMessage[]>;
    getTimetables(batch: string, next: Next): Promise<ITimetable[]>;
    findMcqsByBatch(batchId: string, studentId: string, next: Next): Promise<IMcq[]>;
    submitAnswer(answer: IMcqSubmission, next: Next): Promise<void>;
    addAssignment(assignment: IAssignment, next: Next): Promise<void>;
    getAssignments(studentId: string, next: Next): Promise<IAssignment[]>;
    getAnsweredMcqs(studentId: string, next: Next): Promise<IMcqSubmission[]>;
    getRemarks(batchId: string): Promise<IRemark[]>;
    getAttendance(studentId: string): Promise<any>;
    getBatchRanks(batchId: string, next: Next): Promise<IMcqSubmission[]>;
}
