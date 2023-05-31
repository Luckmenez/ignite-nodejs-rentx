import { Request, Response } from "express";
import { container, injectable } from "tsyringe";

import { ResetUserPasswordUseCase } from "./ResetUserPasswordUseCase";

@injectable()
class ResetUserPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;
    const { password } = request.body;
    const resetUserPasswordUseCase = container.resolve(
      ResetUserPasswordUseCase
    );
    resetUserPasswordUseCase.execute({ token: token.toString(), password });
    return response.json();
  }
}

export { ResetUserPasswordController };
