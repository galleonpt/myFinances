import { Category } from "@prisma/client";
import { Request, Response } from "express";
import { PrismaCategoriesRepository } from "../../repositories/prisma/PrismaCategoriesRepository";
import { CreateCategoryUseCase } from "../../useCases/categories/CreateCategoryUseCase";

class CreateCategoryController {
  async handle(request: Request, response: Response) {
    const { name } = request.body;
    const categoriesRepository: PrismaCategoriesRepository =
      new PrismaCategoriesRepository();

    const createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepository
    );

    const category: Partial<Category> = await createCategoryUseCase.execute({
      userId: request.id,
      name,
    });

    return response.status(201).json(category);
  }
}

export { CreateCategoryController };
