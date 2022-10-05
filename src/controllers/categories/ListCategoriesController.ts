import { Category } from "@prisma/client";
import { Request, Response } from "express";
import { PrismaCategoriesRepository } from "../../repositories/prisma/PrismaCategoriesRepository";
import { ListCategoriesUseCase } from "../../useCases/categories/ListCategoriesUseCase";

class ListCategoriesController {
  async handle(request: Request, response: Response) {
    const categoriesRepository: PrismaCategoriesRepository =
      new PrismaCategoriesRepository();

    const listCategoriesUseCase = new ListCategoriesUseCase(
      categoriesRepository
    );

    const categories: Partial<Category>[] = await listCategoriesUseCase.execute(
      request.id
    );

    return response.json(categories);
  }
}

export { ListCategoriesController };
