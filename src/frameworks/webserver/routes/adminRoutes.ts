import Role from "../../../@types/enum/roles";
import Jwt from "../../services/jwt";
import { Req, Res, Next, Route } from "../../types/serverPackageTypes";
import { isAuth, role } from "../middlewares/auth";
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
    isAuth,
    role([Role.ADMIN]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      adminController.createAdmin(req, res, next);
    })
  );
  router.post(
    "/add-teacher",
    isAuth,
    role([Role.ADMIN]),
    catchAsyncErrors((req: Req, res: Res) => {
      adminController.addTeacher(req, res);
    })
  );
  router.get(
    "/get-teachers",
    isAuth,
    role([Role.ADMIN]),
    catchAsyncErrors((req: Req, res: Res) => {
      adminController.getTeachers(req, res);
    })
  );
  router.put(
    "/block-teacher/:id",
    isAuth,
    role([Role.ADMIN]),
    catchAsyncErrors((req: Req, res: Res) => {
      adminController.blockTeacher(req, res);
    })
  );
  router.delete(
    "/remove-teacher/:id",
    isAuth,
    role([Role.ADMIN]),
    catchAsyncErrors((req: Req, res: Res) => {
      adminController.removeTeacher(req, res);
    })
  );

  router.post(
    "/add-student",
    isAuth,
    role([Role.ADMIN]),
    catchAsyncErrors((req: Req, res: Res) => {
      adminController.addStudent(req, res);
    })
  );
  router.get(
    "/get-students",
    isAuth,
    role([Role.ADMIN]),
    catchAsyncErrors((req: Req, res: Res) => {
      adminController.getStudents(req, res);
    })
  );
  router.put(
    "/block-student/:id",
    isAuth,
    role([Role.ADMIN]),
    catchAsyncErrors((req: Req, res: Res) => {
      adminController.blockStudent(req, res);
    })
  );
  router.delete(
    "/remove-student/:id",
    isAuth,
    role([Role.ADMIN]),
    catchAsyncErrors((req: Req, res: Res) => {
      adminController.removeStudent(req, res);
    })
  );

  router.post(
    "/add-course",
    isAuth,
    role([Role.ADMIN]),
    catchAsyncErrors((req: Req, res: Res) => {
      adminController.addCourse(req, res);
    })
  );
  router.get(
    "/get-courses",
    isAuth,
    role([Role.ADMIN]),
    catchAsyncErrors((req: Req, res: Res) => {
      adminController.getCourses(req, res);
    })
  );
  router.delete(
    "/remove-course/:id",
    isAuth,
    role([Role.ADMIN]),
    catchAsyncErrors((req: Req, res: Res) => {
      adminController.removeCourse(req, res);
    })
  );

  return router;
};
