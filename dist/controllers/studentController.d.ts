import { Req, Res, Next } from "../frameworks/types/serverPackageTypes";
import { IStudentUseCase } from "../useCases/interface/useCase/studentUseCase";
export declare class StudentController {
    private studentUseCase;
    constructor(studentUseCase: IStudentUseCase);
    login(req: Req, res: Res, next: Next): Promise<void | Res>;
    getStudentProfile(req: Req, res: Res, next: Next): Promise<void>;
    updateStudentProfile(req: Req, res: Res, next: Next): Promise<void>;
    getAnnouncements(req: Req, res: Res, next: Next): Promise<void>;
    applyLeave(req: Req, res: Res, next: Next): Promise<void>;
    getLeaves(req: Req, res: Res, next: Next): Promise<void>;
    cancelLeave(req: Req, res: Res, next: Next): Promise<void>;
    addMessage(req: Req, res: Res, next: Next): Promise<void>;
    getChats(req: Req, res: Res, next: Next): Promise<void>;
    getTimetables(req: Req, res: Res, next: Next): Promise<void>;
    getMcqsByBatch(req: Req, res: Res, next: Next): Promise<void>;
    submitAnswer(req: Req, res: Res, next: Next): Promise<Res | undefined>;
    addAssignment(req: Req, res: Res, next: Next): Promise<void>;
    getAssignmentsStudents(req: Req, res: Res, next: Next): Promise<void>;
    getAnsweredMcqsById(req: Req, res: Res, next: Next): Promise<void>;
    getRemarks(req: Req, res: Res, next: Next): Promise<void>;
    getAttendence(req: Req, res: Res, next: Next): Promise<void>;
    getBatchRanks(req: Req, res: Res, next: Next): Promise<void>;
}
