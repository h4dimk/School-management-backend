import Role from "../../../@types/enum/roles";
import { Req, Res, Next, Route } from "../../types/serverPackageTypes";
import { isAuth, role } from "../middlewares/auth";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import { studentController } from "./injuctions/injuctions";

export const studentRoute = (router: Route) => {
  router.post(
    "/login",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      studentController.login(req, res, next);
    })
  );
  router.get(
    "/get-student/:id",
    isAuth,
    role([Role.STUDENT]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      studentController.getStudentProfile(req, res, next);
    })
  );
  router.put(
    "/update-student/:id",
    isAuth,
    role([Role.STUDENT]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      studentController.updateStudentProfile(req, res, next);
    })
  );

  router.get(
    "/get-announcements",
    isAuth,
    role([Role.STUDENT]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      studentController.getAnnouncements(req, res, next);
    })
  );

  router.post(
    "/apply-leave/:id",
    isAuth,
    role([Role.STUDENT]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      studentController.applyLeave(req, res, next);
    })
  );

  router.get(
    "/get-leaves/:id",
    isAuth,
    role([Role.STUDENT]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      studentController.getLeaves(req, res, next);
    })
  );

  router.delete(
    "/cancel-leave/:id",
    isAuth,
    role([Role.STUDENT]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      studentController.cancelLeave(req, res, next);
    })
  );

  router.post(
    "/add-message",
    isAuth,
    role([Role.STUDENT]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      studentController.addMessage(req, res, next);
    })
  );

  router.get(
    "/get-chats/:id",
    isAuth,
    role([Role.STUDENT]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      studentController.getChats(req, res, next);
    })
  );
  router.get(
    "/get-timetable/:id",
    isAuth,
    role([Role.STUDENT]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      studentController.getTimetables(req, res, next);
    })
  );

  router.get(
    "/get-mcqs-batch/:id",
    isAuth,
    role([Role.STUDENT]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      studentController.getMcqsByBatch(req, res, next);
    })
  );

  router.post(
    "/submit-answer",
    isAuth,
    role([Role.STUDENT]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      studentController.submitAnswer(req, res, next);
    })
  );

  router.post(
    "/upload-assignment",
    isAuth,
    role([Role.STUDENT]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      studentController.addAssignment(req, res, next);
    })
  );

  router.get(
    "/get-assignments/:id",
    isAuth,
    role([Role.STUDENT]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      studentController.getAssignmentsStudents(req, res, next);
    })
  );

  router.get(
    "/get-answered-mcqs/:id",
    isAuth,
    role([Role.STUDENT]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      studentController.getAnsweredMcqsById(req, res, next);
    })
  );

  router.get(
    "/get-remarks/:id",
    isAuth,
    role([Role.STUDENT]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      studentController.getRemarks(req, res, next);
    })
  );

  router.get(
    "/get-attendances/:id",
    isAuth,
    role([Role.STUDENT]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      studentController.getAttendence(req, res, next);
    })
  );

  router.get(
    "/get-batch-ranks/:id",
    isAuth,
    role([Role.STUDENT]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      studentController.getBatchRanks(req, res, next);
    })
  );

  return router;
};
