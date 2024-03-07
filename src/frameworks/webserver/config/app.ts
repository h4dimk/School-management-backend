require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

export const app = express();

import { adminRoute } from "../routes/adminRoutes";
import { teacherRoute } from "../routes/teacherRoutes";
import { studentRoute } from "../routes/studentRoutes";

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "PATCH", "PUT", "POST", "DELETE"],
    optionsSuccessStatus: 204,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/admin", adminRoute(express.Router()));
app.use("/api/teacher", teacherRoute);
app.use("/api/student", studentRoute);

//unknown url

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`route ${req.originalUrl} isn't found`) as any;
  error.statusCode = 404;
  next(error);
});
