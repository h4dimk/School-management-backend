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
  return router;
};
