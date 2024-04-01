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

  return router;
};
