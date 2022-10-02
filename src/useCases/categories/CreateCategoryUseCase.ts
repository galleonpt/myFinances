import {
  CategoriesRepository,
  CreateCategoryData,
} from "../../repositories/CategoriesRepository";
import Joi, { ObjectSchema } from "joi";
import { CustomError } from "../../exceptions/CustomError";
import { Category } from "@prisma/client";

class CreateCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async execute(body: CreateCategoryData): Promise<Partial<Category>> {
    const schema: ObjectSchema<CreateCategoryData> = Joi.object({
      name: Joi.string().required(),
      userId: Joi.number().required(),
    });

    const { error } = schema.validate(body);

    if (error) {
      throw new CustomError({ message: error.message, status: 422 });
    }

    return this.categoriesRepository.create(body);
  }
}

export { CreateCategoryUseCase };
