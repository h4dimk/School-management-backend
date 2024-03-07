import { Req, Res, Next, Route } from "../../types/serverPackageTypes";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import { adminController } from "./injuctions/injuctions";

export const adminRoute = (router: Route) => {
  router.post(
    "/login",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      adminController.login(req, res, next);
    })
  );
  router.post(
    "/create",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      adminController.createAdmin(req, res, next);
    })
  );
  router.post(
    "/add-teacher",
    catchAsyncErrors((req: Req, res: Res) => {
      adminController.addTeacher(req, res);
    })
  );
  router.get(
    "/get-teachers",
    catchAsyncErrors((req: Req, res: Res) => {
      adminController.getTeachers(req, res);
    })
  );

  return router;
};
