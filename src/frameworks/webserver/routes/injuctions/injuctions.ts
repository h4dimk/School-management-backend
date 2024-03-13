import adminModel from "../../../database/models/adminModel";
import teacherModel from "../../../database/models/teacherModel";
import studentModel from "../../../database/models/studentModel";

import { AdminRepository } from "../../../database/repository/adminRepository";
import { TeacherRepository } from "../../../database/repository/teacherRepository";
import { StudentRepository } from "../../../database/repository/studentRepository";

import { AdminController } from "../../../../controllers/adminController";
import { TeacherController } from "../../../../controllers/teacherController";
import { StudentController } from "../../../../controllers/studentController";

import { AdminUseCase } from "../../../../useCases/useCases/adminUseCase";
import { TeacherUseCase } from "../../../../useCases/useCases/teacherUseCase";
import { StudentUseCase } from "../../../../useCases/useCases/studentUseCase";

import Jwt from "../../../services/jwt";
import { SendMail } from "../../../services/sendMail";

const jwt = new Jwt();
const sendMail = new SendMail();

const adminRepository = new AdminRepository(adminModel);
const teacherRepository = new TeacherRepository(teacherModel);
const studentRepository = new StudentRepository(studentModel);

const adminUseCase = new AdminUseCase(adminRepository, jwt, sendMail);
const teacherUseCase = new TeacherUseCase(teacherRepository,jwt);
const studentUseCase = new StudentUseCase(studentRepository);

const adminController = new AdminController(adminUseCase);
const teacherController = new TeacherController(teacherUseCase);
const studentController = new StudentController(studentUseCase);

export { adminController, teacherController, studentController };
