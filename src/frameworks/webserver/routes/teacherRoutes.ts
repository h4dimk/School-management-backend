import { Req, Res, Next, Route } from "../../types/serverPackageTypes";

export const teacherRoute = (router: Route) => {
  router.get("/");
};
