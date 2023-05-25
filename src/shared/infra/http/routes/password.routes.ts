import { Router } from "express";

import { SendForgotMailPasswordController } from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotMailPasswordController";

const passwordRoutes = Router();

const sendForgotMailPasswordController = new SendForgotMailPasswordController();

passwordRoutes.post("/forgot", sendForgotMailPasswordController.handle);

export { passwordRoutes };
