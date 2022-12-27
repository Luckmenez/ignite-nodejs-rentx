import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import { User } from "@modules/accounts/entities/User";

import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({
    driver_license,
    name,
    email,
    password,
  }: ICreateUsersDTO): Promise<void> {
    const user = new User();
    Object.assign(user, {
      driver_license,
      name,
      email,
      password,
    });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }

  async findById(user_id: string): Promise<User> {
    return this.users.find((user) => user.id === user_id);
  }
}

export { UsersRepositoryInMemory };
