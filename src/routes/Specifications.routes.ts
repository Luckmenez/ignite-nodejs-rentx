import { Router } from "express";

import { ensureAuthentication } from "../middlewares/ensureAuthentication";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const createSpecificationController = new CreateSpecificationController();

const specificationsRoutes = Router();

specificationsRoutes.use(ensureAuthentication);
specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes };
