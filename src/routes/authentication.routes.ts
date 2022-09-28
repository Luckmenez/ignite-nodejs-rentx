import { Router } from "express";

import { UserAuthenticationController } from "../modules/accounts/useCases/userAuthentication/userAuthenticationController";

const authenticationRoutes = Router();

const userAuthenticationController = new UserAuthenticationController();

authenticationRoutes.post("/sessions", userAuthenticationController.handle);

export { authenticationRoutes };
