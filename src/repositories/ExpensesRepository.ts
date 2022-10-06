import { Expense } from "@prisma/client";

export interface CreateExpenseData {
  name: string;
  userId: number;
  currencyId: number;
  value: number;
  place: string;
  categoryId: number;
}

export interface ExpensesRepository {
  create: (data: CreateExpenseData) => Promise<Partial<Expense>>;
  getAll: (userId: number) => Promise<Partial<Expense>[]>;
  findById: (id: number) => Promise<Partial<Expense> | null>;
  // deleteById: (id: number) => void;
}
