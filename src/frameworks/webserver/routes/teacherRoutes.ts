import Role from "../../../@types/enum/roles";
import { Req, Res, Next, Route } from "../../types/serverPackageTypes";
import { isAuth, role } from "../middlewares/auth";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import { teacherController } from "./injuctions/injuctions";

export const teacherRoute = (router: Route) => {
  router.post(
    "/login",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      teacherController.login(req, res, next);
    })
  );
  router.get(
    "/get-teacher/:id",
    isAuth,
    role([Role.TEACHER]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      teacherController.getTeacherProfile(req, res, next);
    })
  );
  router.put(
    "/update-teacher/:id",
    isAuth,
    role([Role.TEACHER]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      teacherController.updateTeacherProfile(req, res, next);
    })
  );

  router.get(
    "/get-announcements",
    isAuth,
    role([Role.TEACHER]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      teacherController.getAnnouncements(req, res, next);
    })
  );

  router.post(
    "/add-attendence",
    isAuth,
    role([Role.TEACHER]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      teacherController.uploadAttendance(req, res, next);
    })
  );

  router.get(
    "/get-attendances/:id",
    isAuth,
    role([Role.TEACHER]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      teacherController.getAttendance(req, res, next);
    })
  );

  router.post(
    "/apply-leave/:id",
    isAuth,
    role([Role.TEACHER]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      teacherController.applyLeave(req, res, next);
    })
  );

  router.get(
    "/get-leaves/:id",
    isAuth,
    role([Role.TEACHER]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      teacherController.getLeaves(req, res, next);
    })
  );

  router.delete(
    "/cancel-leave/:id",
    isAuth,
    role([Role.TEACHER]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      teacherController.cancelLeave(req, res, next);
    })
  );

  router.get(
    "/get-students-leaves",
    isAuth,
    role([Role.TEACHER]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      teacherController.getStudentsLeaves(req, res, next);
    })
  );

  router.put(
    "/update-student-leave-status",
    isAuth,
    role([Role.TEACHER]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      teacherController.updateStudentsLeaveStatus(req, res, next);
    })
  );

  router.get(
    "/get-timetable/:id",
    isAuth,
    role([Role.TEACHER]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      teacherController.getTimetables(req, res, next);
    })
  );

  router.post(
    "/add-mcq",
    isAuth,
    role([Role.TEACHER]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      teacherController.addMcq(req, res, next);
    })
  );

  router.get(
    "/get-mcqs-teacher/:id",
    isAuth,
    role([Role.TEACHER]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      teacherController.getMcqsForTeacher(req, res, next);
    })
  );

  router.get(
    "/get-mcqs-batch/:id",
    isAuth,
    role([Role.TEACHER]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      teacherController.getMcqsByBatch(req, res, next);
    })
  );

  router.get(
    "/get-assignments/:id",
    isAuth,
    role([Role.TEACHER]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      teacherController.getAssignmentsBatch(req, res, next);
    })
  );

  // router.post(
  //   "/add-message",
  //   isAuth,
  //   role([Role.TEACHER]),
  //   catchAsyncErrors((req: Req, res: Res, next: Next) => {
  //     teacherController.addMessage(req, res, next);
  //   })
  // );

  router.get(
    "/get-chats/:id",
    isAuth,
    role([Role.TEACHER]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      teacherController.getChats(req, res, next);
    })
  );

  router.post(
    "/add-remarks",
    isAuth,
    role([Role.TEACHER]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      teacherController.addRemark(req, res, next);
    })
  );

  router.get(
    "/get-remarks/:id",
    isAuth,
    role([Role.TEACHER]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      teacherController.getRemarks(req, res, next);
    })
  );

  router.get(
    "/get-batches",
    isAuth,
    role([Role.TEACHER]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      teacherController.getBatches(req, res, next);
    })
  );
  router.get(
    "/get-batch-ranks/:id",
    isAuth,
    role([Role.TEACHER]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      teacherController.getBatchRanks(req, res, next);
    })
  );

  return router;
};
