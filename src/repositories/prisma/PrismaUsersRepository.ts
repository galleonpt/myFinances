import { User } from "@prisma/client";
import { prisma } from "../../prisma";
import { CreateUserData, UsersRepository } from "../UsersRepository";

class PrismaUsersRepository implements UsersRepository {
  async create({ name, email, password }: CreateUserData): Promise<User> {
    return prisma.user.create({
      data: {
        name,
        email,
        password,
        deleted: false,
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
}

export { PrismaUsersRepository };
