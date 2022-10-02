import { Category, User } from "@prisma/client";
import { prisma } from "../../prisma";
import {
  CategoriesRepository,
  CreateCategoryData,
} from "../CategoriesRepository";

class PrismaCategoriesRepository implements CategoriesRepository {
  async create({
    name,
    userId,
  }: CreateCategoryData): Promise<Partial<Category>> {
    return prisma.category.create({
      data: {
        name,
        userId,
        deleted: false,
      },
      select: {
        id: true,
        name: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  getAll(): Promise<Partial<Category>[]> {
    return prisma.category.findMany({
      where: { deleted: false },
      select: { id: true, name: true },
    });
  }

  findById(id: number): Promise<Partial<Category> | null> {
    return prisma.category.findFirst({
      where: { id, deleted: false },
      select: { name: true, id: true },
    });
  }

  // deleteById(id: number): Promise<User> {
  //   return prisma.user.update({
  //     where: { id },
  //     data: { deleted: true },
  //   });
  // }
}

export { PrismaCategoriesRepository };
