import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ensureAuthentication } from "@shared/infra/http/middlewares/ensureAuthentication";

const createSpecificationController = new CreateSpecificationController();

const specificationsRoutes = Router();

specificationsRoutes.use(ensureAuthentication);
specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes };
