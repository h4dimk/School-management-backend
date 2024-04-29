import Role from "../../../@types/enum/roles";
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
    "/add-teacher",
    isAuth,
    role([Role.ADMIN]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      adminController.addTeacher(req, res, next);
    })
  );
  router.get(
    "/get-teachers",
    isAuth,
    role([Role.ADMIN]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      adminController.getTeachers(req, res, next);
    })
  );
  router.put(
    "/block-teacher/:id",
    isAuth,
    role([Role.ADMIN]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      adminController.blockTeacher(req, res, next);
    })
  );
  router.delete(
    "/remove-teacher/:id",
    isAuth,
    role([Role.ADMIN]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      adminController.removeTeacher(req, res, next);
    })
  );

  router.post(
    "/add-student",
    isAuth,
    role([Role.ADMIN]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      adminController.addStudent(req, res, next);
    })
  );
  router.get(
    "/get-students",
    isAuth,
    role([Role.ADMIN]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      adminController.getStudents(req, res, next);
    })
  );
  router.put(
    "/block-student/:id",
    isAuth,
    role([Role.ADMIN]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      adminController.blockStudent(req, res, next);
    })
  );
  router.delete(
    "/remove-student/:id",
    isAuth,
    role([Role.ADMIN]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      adminController.removeStudent(req, res, next);
    })
  );

  router.post(
    "/add-course",
    isAuth,
    role([Role.ADMIN]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      adminController.addCourse(req, res, next);
    })
  );
  router.get(
    "/get-courses",
    isAuth,
    role([Role.ADMIN]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      adminController.getCourses(req, res, next);
    })
  );
  router.delete(
    "/remove-course/:id",
    isAuth,
    role([Role.ADMIN]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      adminController.removeCourse(req, res, next);
    })
  );

  router.put(
    "/update-course/:id",
    isAuth,
    role([Role.ADMIN]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      adminController.updateCourseDetails(req, res, next);
    })
  );

  router.get(
    "/get-admin/:id",
    isAuth,
    role([Role.ADMIN]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      adminController.getAdminProfile(req, res, next);
    })
  );

  router.put(
    "/update-admin/:id",
    isAuth,
    role([Role.ADMIN]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      adminController.updateAdminProfile(req, res, next);
    })
  );

  router.post(
    "/add-batch",
    isAuth,
    role([Role.ADMIN]),

    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      adminController.addBatch(req, res, next);
    })
  );

  router.get(
    "/get-batches",
    isAuth,
    role([Role.ADMIN]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      adminController.getBatches(req, res, next);
    })
  );

  router.delete(
    "/remove-batch/:id",
    isAuth,
    role([Role.ADMIN]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      adminController.removeBatch(req, res, next);
    })
  );

  router.post(
    "/add-announcement",
    isAuth,
    role([Role.ADMIN]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      adminController.addAnnouncement(req, res, next);
    })
  );

  router.get(
    "/get-announcements",
    isAuth,
    role([Role.ADMIN]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      adminController.getAnnouncements(req, res, next);
    })
  );

  router.delete(
    "/remove-announcement/:id",
    isAuth,
    role([Role.ADMIN]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      adminController.removeAnnouncement(req, res, next);
    })
  );

  router.get(
    "/get-teachers-leaves",
    isAuth,
    role([Role.ADMIN]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      adminController.getTeachersLeaves(req, res, next);
    })
  );

  router.get(
    "/get-students-leaves",
    isAuth,
    role([Role.ADMIN]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      adminController.getStudentsLeaves(req, res, next);
    })
  );

  router.put(
    "/update-teacher-leave-status",
    isAuth,
    role([Role.ADMIN]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      adminController.updateTeachersLeaveStatus(req, res, next);
    })
  );

  router.put(
    "/update-student-leave-status",
    isAuth,
    role([Role.ADMIN]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      adminController.updateStudentsLeaveStatus(req, res, next);
    })
  );

  router.post(
    "/add-timetable",
    isAuth,
    role([Role.ADMIN]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      adminController.addTimetable(req, res, next);
    })
  );

  router.get(
    "/get-timetable",
    isAuth,
    role([Role.ADMIN]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      adminController.getTimetables(req, res, next);
    })
  );

  router.delete(
    "/remove-timetable/:id",
    isAuth,
    role([Role.ADMIN]),
    catchAsyncErrors((req: Req, res: Res, next: Next) => {
      adminController.deleteTimetable(req, res, next);
    })
  );

  return router;
};
