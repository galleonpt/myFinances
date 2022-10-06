import { Expense } from "@prisma/client";
import { prisma } from "../../prisma";
import { CreateExpenseData, ExpensesRepository } from "../ExpensesRepository";

class PrismaExpensesRepository implements ExpensesRepository {
  async create({
    name,
    userId,
    currencyId,
    value,
    place,
    categoryId,
  }: CreateExpenseData): Promise<Partial<Expense>> {
    return prisma.expense.create({
      data: {
        name,
        userId,
        currencyId,
        categoryId,
        place,
        value,
        deleted: false,
      },
      select: {
        id: true,
        name: true,
        value: true,
        place: true,
        currency: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  getAll(userId: number): Promise<Partial<Expense>[]> {
    return prisma.expense.findMany({
      where: { deleted: false, userId },
      select: {
        id: true,
        name: true,
        value: true,
        place: true,
        currency: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  findById(id: number): Promise<Partial<Expense> | null> {
    return prisma.expense.findFirst({
      where: { id, deleted: false },
      select: {
        id: true,
        name: true,
        value: true,
        place: true,
        currency: {
          select: {
            id: true,
            name: true,
            code: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  // deleteById(id: number): Promise<User> {
  //   return prisma.user.update({
  //     where: { id },
  //     data: { deleted: true },
  //   });
  // }
}

export { PrismaExpensesRepository };
