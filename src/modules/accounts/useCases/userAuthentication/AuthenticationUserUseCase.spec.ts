import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { UserAuthenticationUseCase } from "./userAuthenticationUseCase";

let authenticateUserUseCase: UserAuthenticationUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let userTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let dateProvider: DayJsDateProvider;

describe("User Authentication", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    userTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayJsDateProvider();
    authenticateUserUseCase = new UserAuthenticationUseCase(
      usersRepositoryInMemory,
      userTokensRepositoryInMemory,
      dateProvider
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });
  it("should be able to authenticate an user", async () => {
    const user: ICreateUsersDTO = {
      driver_license: "00123",
      email: "user@test.com",
      password: "1234",
      name: "UserTest",
    };
    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("Should not be able to authenticate an non existent user", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: "false@mail.com",
        password: "falsePassword",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!"));
  });

  it("Should not be able to authenticate an user with incorrect password", async () => {
    const user: ICreateUsersDTO = {
      driver_license: "xptolicence",
      email: "xptoEmail@email.com",
      password: "xptopassword",
      name: "xptoName",
    };
    await createUserUseCase.execute(user);
    await expect(
      authenticateUserUseCase.execute({
        email: "xptoEmail@email.com",
        password: "IncorrectPassword",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect!"));
  });
});
