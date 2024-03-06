import { Req, Res, Next, Route } from "../../types/serverPackageTypes";
import { adminController } from "./injuctions/injuctions";

export const adminRoute = (router: Route) => {
  router.post("/login", adminController.login);
  router.post("/create", adminController.createAdmin);
  router.get("/hey",(req:Req,res:Res)=>{
    console.log("hey")
    res.end()
  })
  return router;
};
