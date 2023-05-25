import { Router } from "express";

import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/RefreshTokenController";
import { UserAuthenticationController } from "@modules/accounts/useCases/userAuthentication/userAuthenticationController";

const authenticationRoutes = Router();

const userAuthenticationController = new UserAuthenticationController();
const refreshTokenController = new RefreshTokenController();

authenticationRoutes.post("/sessions", userAuthenticationController.handle);
authenticationRoutes.post("/refresh-token", refreshTokenController.handle);

export { authenticationRoutes };
