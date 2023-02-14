import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";
import { RentalDevolutionController } from "@modules/rentals/useCases/rentalDevolution/RentalDevolutionController";

import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const rentalDevolutionController = new RentalDevolutionController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post("/", ensureAuthentication, createRentalController.handle);
rentalRoutes.post(
  "/devolution/:id",
  ensureAuthentication,
  rentalDevolutionController.handle
);
rentalRoutes.get(
  "/user",
  ensureAuthentication,
  listRentalsByUserController.handle
);

export { rentalRoutes };
