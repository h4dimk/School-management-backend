import { Req, Res, Next } from "../frameworks/types/serverPackageTypes";

import { IAdminUseCase } from "../useCases/interface/useCase/adminUseCase";

import { ITeacher } from "../entities/teacherEntity";

import { randomBytes } from "crypto";

export class AdminController {
  private readonly adminUseCase: IAdminUseCase;

  constructor(adminUseCase: IAdminUseCase) {
    this.adminUseCase = adminUseCase;
  }

  async login(req: Req, res: Res, next: Next) {
    try {
      const { email, password } = req.body;
      const token = await this.adminUseCase.login(email, password);
      return res.status(200).json({ token });
    } catch (error) {
      return next(error);
    }
  }

  async createAdmin(req: Req, res: Res, next: Next) {
    try {
      const { email, password } = req.body;
      await this.adminUseCase.createAdmin(email, password);
      return res.status(201).send("Admin created successfully");
    } catch (error) {
      console.error("Error creating admin:", error);
      return next(error);
    }
  }

  async addTeacher(req: Req, res: Res) {
    try {
      const { name, email, subject, gender } = req.body;
      const password = randomBytes(8).toString("hex");
      const newTeacher: ITeacher = {
        name,
        email,
        subject,
        gender,
        password,
      };
      const addedTeacher = await this.adminUseCase.addTeacher(newTeacher);
      res.status(201).json(addedTeacher);
    } catch (error) {
      console.error("Error adding teacher:", error);
      res.status(500).json({ error: "Failed to add teacher" });
    }
  }

  async getTeachers(req: Req, res: Res){
    try {
    
      const teachers= await this.adminUseCase.getTeachers();
      res.json(teachers);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      res.status(500).json({ error: "Failed to fetch teachers" });
      
    }
  }
}
