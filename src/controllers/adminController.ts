import { Route, Req, Res, Next } from "../frameworks/types/serverPackageTypes";

import { IAdminUseCase } from "../useCases/interface/useCase/adminUseCase";

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
}
