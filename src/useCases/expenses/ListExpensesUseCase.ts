import { Expense } from "@prisma/client";
import { PrismaExpensesRepository } from "../../repositories/prisma/PrismaExpensesRepository";

class ListExpensesUseCase {
  constructor(private expensesRepository: PrismaExpensesRepository) {}

  async execute(userId: number): Promise<Partial<Expense>[]> {
    return this.expensesRepository.getAll(userId);
  }
}

export { ListExpensesUseCase };
