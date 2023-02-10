import { Category } from "@modules/cars/infra/typeorm/entities/category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoryRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
}

export { ICategoryRepository, ICreateCategoryDTO };
