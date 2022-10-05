import { Expense } from "@prisma/client";
import Joi, { ObjectSchema } from "joi";
import { CustomError } from "../../exceptions/CustomError";
import { CategoriesRepository } from "../../repositories/CategoriesRepository";
import {
  CreateExpenseData,
  ExpensesRepository,
} from "../../repositories/ExpensesRepository";

class CreateExpenseUseCase {
  constructor(
    private expensesRepository: ExpensesRepository,
    private categoriesRepository: CategoriesRepository
  ) {}

  async execute(body: CreateExpenseData): Promise<Partial<Expense>> {
    const schema: ObjectSchema<CreateExpenseData> = Joi.object({
      name: Joi.string().required(),
      userId: Joi.number().required(),
      currency: Joi.string().required(),
      value: Joi.number().required().min(0),
      place: Joi.string().required(),
      categoryId: Joi.number().required(),
    });

    const { error } = schema.validate(body);

    if (error) {
      throw new CustomError({ message: error.message, status: 422 });
    }

    if (!(await this.categoriesRepository.findById(body.categoryId))) {
      throw new CustomError({ message: "Invalid category" });
    }

    return this.expensesRepository.create(body);
  }
}

export { CreateExpenseUseCase };
