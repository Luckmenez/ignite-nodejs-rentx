import { container } from "tsyringe";

import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { CarsImagesRepository } from "@modules/cars/infra/typeorm/repositories/implementations/CarsImageRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/implementations/CarsRepositories";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/implementations/CategoriesRepository";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/implementations/SpecificationsRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICategoryRepository } from "@modules/cars/repositories/ICategoryRepository";
import { ICarsImagesRepository } from "@modules/cars/repositories/in-memory/ICarsImagesRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

container.registerSingleton<ICategoryRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);

container.registerSingleton<ICarsImagesRepository>(
  "CarsImagesRepository",
  CarsImagesRepository
);
