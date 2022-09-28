import { Request, Response } from "express";
import { container } from "tsyringe";

import { UserAuthenticationUseCase } from "./userAuthenticationUseCase";

class UserAuthenticationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password, email } = request.body;

    const authenticationUserUseCase = container.resolve(
      UserAuthenticationUseCase
    );

    const token = await authenticationUserUseCase.execute({
      password,
      email,
    });

    return response.status(201).json(token);
  }
}

export { UserAuthenticationController };
