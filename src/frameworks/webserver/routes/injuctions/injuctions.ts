import adminModel from "../../../database/models/adminModel";

import { AdminRepository } from "../../../database/repository/adminRepository";

import { AdminController } from "../../../../controllers/adminController";

import { AdminUseCase } from "../../../../useCases/useCases/adminUseCase";

const adminRepository = new AdminRepository(adminModel)

const adminUseCase = new AdminUseCase(adminRepository);

const adminController = new AdminController(adminUseCase);

export { adminController };
