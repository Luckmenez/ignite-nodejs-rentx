import { inject, injectable } from "tsyringe";

import { Category } from "@modules/cars/infra/typeorm/entities/category";
import { ICategoryRepository } from "@modules/cars/repositories/ICategoryRepository";

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoryRepository
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list();

    return categories;
  }
}

export { ListCategoriesUseCase };
