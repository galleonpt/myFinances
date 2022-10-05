import { Expense } from "@prisma/client";
import { Request, Response } from "express";
import { PrismaCategoriesRepository } from "../../repositories/prisma/PrismaCategoriesRepository";
import { PrismaExpensesRepository } from "../../repositories/prisma/PrismaExpensesRepository";
import { CreateExpenseUseCase } from "../../useCases/expenses/CreateExpenseUseCase";

class CreateExpenseController {
  async handle(request: Request, response: Response) {
    const expensesRepository = new PrismaExpensesRepository();
    const categoriesRepository = new PrismaCategoriesRepository();

    const createExpensesUseCase = new CreateExpenseUseCase(
      expensesRepository,
      categoriesRepository
    );

    const expense: Partial<Expense> = await createExpensesUseCase.execute({
      userId: request.id,
      ...request.body,
    });

    return response.status(201).json(expense);
  }
}

export { CreateExpenseController };
