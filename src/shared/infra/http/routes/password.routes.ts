import { Router } from "express";

import { ResetUserPasswordController } from "@modules/accounts/useCases/resetUserPassword/ResetUserPasswordController";
import { SendForgotMailPasswordController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotMailPasswordController";

const passwordRoutes = Router();

const sendForgotMailPasswordController = new SendForgotMailPasswordController();
const resetUserPasswordController = new ResetUserPasswordController();

passwordRoutes.post("/forgot", sendForgotMailPasswordController.handle);
passwordRoutes.post("/reset", resetUserPasswordController.handle);

export { passwordRoutes };
