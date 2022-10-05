import { Category } from "@prisma/client";

export interface CreateCategoryData {
  name: string;
  userId: number;
}

export interface CategoriesRepository {
  create: (data: CreateCategoryData) => Promise<Partial<Category>>;
  getAll: (userId: number) => Promise<Partial<Category>[]>;
  findById: (id: number) => Promise<Partial<Category> | null>;
  // deleteById: (id: number) => void;
}
