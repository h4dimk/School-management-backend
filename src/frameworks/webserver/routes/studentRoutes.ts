import { Req, Res, Next, Route } from "../../types/serverPackageTypes";

export const studentRoute = (router: Route) => {
  router.get("/");
};
