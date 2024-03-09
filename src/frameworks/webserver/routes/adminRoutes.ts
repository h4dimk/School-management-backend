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
  router.put(
    "/block-teacher/:id",
    catchAsyncErrors((req: Req, res: Res) => {
      adminController.blockTeacher(req, res);
    })
  );
  router.delete(
    "/remove-teacher/:id",
    catchAsyncErrors((req: Req, res: Res) => {
      adminController.removeTeacher(req, res);
    })
  );

  router.post(
    "/add-student",
    catchAsyncErrors((req: Req, res: Res) => {
      adminController.addStudent(req, res);
    })
  );
  router.get(
    "/get-students",
    catchAsyncErrors((req: Req, res: Res) => {
      adminController.getStudents(req, res);
    })
  );
  router.put(
    "/block-student/:id",
    catchAsyncErrors((req: Req, res: Res) => {
      adminController.blockStudent(req, res);
    })
  );
  router.delete(
    "/remove-student/:id",
    catchAsyncErrors((req: Req, res: Res) => {
      adminController.removeStudent(req, res);
    })
  );

  router.post(
    "/add-course",
    catchAsyncErrors((req: Req, res: Res) => {
      adminController.addCourse(req, res);
    })
  );
  router.get(
    "/get-courses",
    catchAsyncErrors((req: Req, res: Res) => {
      adminController.getCourses(req, res);
    })
  );
  router.delete(
    "/remove-course/:id",
    catchAsyncErrors((req: Req, res: Res) => {
      adminController.removeCourse(req, res);
    })
  );

  return router;
};
