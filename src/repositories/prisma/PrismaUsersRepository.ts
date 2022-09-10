import { User } from "@prisma/client";
import { prisma } from "../../prisma";
import { CreateUserData, UsersRepository } from "../UsersRepository";

class PrismaUsersRepository implements UsersRepository {
  async create({
    name,
    email,
    password,
  }: CreateUserData): Promise<Partial<User>> {
    return prisma.user.create({
      data: {
        name,
        email,
        password,
        deleted: false,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  getAll(): Promise<Partial<User>[]> {
    return prisma.user.findMany({
      where: { deleted: false },
      select: { id: true, name: true, email: true },
    });
  }

  findById(id: number): Promise<Partial<User> | null> {
    return prisma.user.findFirst({
      where: { id, deleted: false },
      select: { email: true, name: true, id: true },
    });
  }

  deleteById(id: number): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: { deleted: true },
    });
  }
}

export { PrismaUsersRepository };
