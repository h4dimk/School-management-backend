import { Req, Res, Next } from "../frameworks/types/serverPackageTypes";
import { ITeacherUseCase } from "../useCases/interface/useCase/teacherUseCase";
export declare class TeacherController {
    private teacherUseCase;
    constructor(teacherUseCase: ITeacherUseCase);
    login(req: Req, res: Res, next: Next): Promise<void | Res>;
    getTeacherProfile(req: Req, res: Res, next: Next): Promise<void>;
    updateTeacherProfile(req: Req, res: Res, next: Next): Promise<void>;
    getAnnouncements(req: Req, res: Res, next: Next): Promise<void>;
    uploadAttendance(req: Req, res: Res, next: Next): Promise<Res | undefined>;
    getAttendance(req: Req, res: Res, next: Next): Promise<void>;
    applyLeave(req: Req, res: Res, next: Next): Promise<void>;
    getLeaves(req: Req, res: Res, next: Next): Promise<void>;
    cancelLeave(req: Req, res: Res, next: Next): Promise<void>;
    getStudentsLeaves(req: Req, res: Res, next: Next): Promise<void>;
    updateStudentsLeaveStatus(req: Req, res: Res, next: Next): Promise<void>;
    getTimetables(req: Req, res: Res, next: Next): Promise<void>;
    addMcq(req: Req, res: Res, next: Next): Promise<Res | undefined>;
    getMcqsForTeacher(req: Req, res: Res, next: Next): Promise<void>;
    getMcqsByBatch(req: Req, res: Res, next: Next): Promise<void>;
    getAssignmentsBatch(req: Req, res: Res, next: Next): Promise<void>;
    getChats(req: Req, res: Res, next: Next): Promise<void>;
    addRemark(req: Req, res: Res, next: Next): Promise<void>;
    getRemarks(req: Req, res: Res, next: Next): Promise<void>;
    getBatches(req: Req, res: Res, next: Next): Promise<void>;
    getBatchRanks(req: Req, res: Res, next: Next): Promise<void>;
}
