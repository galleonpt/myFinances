import { Expense } from "@prisma/client";
import { Request, Response } from "express";
import { PrismaExpensesRepository } from "../../repositories/prisma/PrismaExpensesRepository";
import { ListExpensesUseCase } from "../../useCases/expenses/ListExpensesUseCase";

class ListExpensesController {
  async handle(request: Request, response: Response) {
    const expensesRepository: PrismaExpensesRepository =
      new PrismaExpensesRepository();

    const listExpensesUseCase = new ListExpensesUseCase(expensesRepository);

    const expenses: Partial<Expense>[] = await listExpensesUseCase.execute(
      request.id
    );

    return response.json(expenses);
  }
}

export { ListExpensesController };
