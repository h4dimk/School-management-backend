import { Req, Res, Next, Route } from "../../types/serverPackageTypes";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import { teacherController } from "./injuctions/injuctions";

export const teacherRoute = (router: Route) => {
  router.post(
    "/login",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      teacherController.login(req, res, next);
    })
  );

  return router;
};
