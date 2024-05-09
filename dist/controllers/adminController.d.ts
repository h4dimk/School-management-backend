import { Req, Res, Next } from "../frameworks/types/serverPackageTypes";
import { IAdminUseCase } from "../useCases/interface/useCase/adminUseCase";
export declare class AdminController {
    private readonly adminUseCase;
    constructor(adminUseCase: IAdminUseCase);
    login(req: Req, res: Res, next: Next): Promise<void>;
    addTeacher(req: Req, res: Res, next: Next): Promise<void>;
    getTeachers(req: Req, res: Res, next: Next): Promise<void>;
    blockTeacher(req: Req, res: Res, next: Next): Promise<void>;
    removeTeacher(req: Req, res: Res, next: Next): Promise<void>;
    addStudent(req: Req, res: Res, next: Next): Promise<void>;
    getStudents(req: Req, res: Res, next: Next): Promise<void>;
    blockStudent(req: Req, res: Res, next: Next): Promise<void>;
    removeStudent(req: Req, res: Res, next: Next): Promise<void>;
    addCourse(req: Req, res: Res, next: Next): Promise<Res | undefined>;
    getCourses(req: Req, res: Res, next: Next): Promise<void>;
    removeCourse(req: Req, res: Res, next: Next): Promise<void>;
    updateCourseDetails(req: Req, res: Res, next: Next): Promise<void>;
    getAdminProfile(req: Req, res: Res, next: Next): Promise<void>;
    updateAdminProfile(req: Req, res: Res, next: Next): Promise<void>;
    addBatch(req: Req, res: Res, next: Next): Promise<void>;
    getBatches(req: Req, res: Res, next: Next): Promise<void>;
    removeBatch(req: Req, res: Res, next: Next): Promise<void>;
    addAnnouncement(req: Req, res: Res, next: Next): Promise<void>;
    getAnnouncements(req: Req, res: Res, next: Next): Promise<void>;
    removeAnnouncement(req: Req, res: Res, next: Next): Promise<void>;
    getTeachersLeaves(req: Req, res: Res, next: Next): Promise<void>;
    getStudentsLeaves(req: Req, res: Res, next: Next): Promise<void>;
    updateTeachersLeaveStatus(req: Req, res: Res, next: Next): Promise<void>;
    updateStudentsLeaveStatus(req: Req, res: Res, next: Next): Promise<void>;
    addTimetable(req: Req, res: Res, next: Next): Promise<Res | undefined>;
    deleteTimetable(req: Req, res: Res, next: Next): Promise<void>;
    getTimetables(req: Req, res: Res, next: Next): Promise<void>;
    getAtendence(req: Req, res: Res, next: Next): Promise<void>;
}
