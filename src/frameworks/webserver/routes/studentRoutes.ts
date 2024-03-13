import { Req, Res, Next, Route } from "../../types/serverPackageTypes";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import { studentController } from "./injuctions/injuctions";

export const studentRoute = (router: Route) => {
  router.post(
    "/login",
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      studentController.login(req, res, next);
    })
  );
  return router;
};
