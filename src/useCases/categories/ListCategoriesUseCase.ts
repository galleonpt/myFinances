import { Category } from "@prisma/client";
import { CategoriesRepository } from "../../repositories/CategoriesRepository";

class ListCategoriesUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute(userId: number): Promise<Partial<Category>[]> {
    return this.categoriesRepository.getAll(userId);
  }
}

export { ListCategoriesUseCase };
