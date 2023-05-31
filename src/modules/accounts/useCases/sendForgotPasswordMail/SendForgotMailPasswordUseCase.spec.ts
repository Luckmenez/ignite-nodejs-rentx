import { jest } from "@jest/globals";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotMailPasswordUseCase } from "./SendForgotMailPasswordUseCase";

let sendForgotMailPasswordUseCase: SendForgotMailPasswordUseCase;
let usersRespositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayJsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProviderInMemory: MailProviderInMemory;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRespositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayJsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProviderInMemory = new MailProviderInMemory();

    sendForgotMailPasswordUseCase = new SendForgotMailPasswordUseCase(
      usersRespositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProviderInMemory
    );
  });

  it("should be able to send a password recovery mail to user", async () => {
    const sendMAil = jest.spyOn(mailProviderInMemory, "sendMail");

    await usersRespositoryInMemory.create({
      driver_license: "75090626",
      email: "ca@vuloja.bn",
      name: "Marc Marsh",
      password: "123abc",
    });

    await sendForgotMailPasswordUseCase.execute("ca@vuloja.bn");

    expect(sendMAil).toHaveBeenCalled();
  });

  it("should not be able to send a password recovery email if user does not exist", async () => {
    await expect(
      sendForgotMailPasswordUseCase.execute("ik@laru.mo")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("should be able to create an usersToken", async () => {
    const mailTokenGenerator = jest.spyOn(
      usersTokensRepositoryInMemory,
      "create"
    );

    await usersRespositoryInMemory.create({
      driver_license: "77020013",
      email: "gi@hohjiju.mo",
      name: "Evan Moss",
      password: "123abb",
    });

    await sendForgotMailPasswordUseCase.execute("gi@hohjiju.mo");

    expect(mailTokenGenerator).toBeCalled();
  });
});
