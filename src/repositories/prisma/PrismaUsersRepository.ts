import { User } from "@prisma/client";
import { prisma } from "../../prisma";
import { CreateUserData, UsersRepositoty } from "../UsersRepository";

class PrismaUsersRepository implements UsersRepositoty {
  async create({ name, email, password }: CreateUserData): Promise<User> {
    return await prisma.user.create({
      data: {
        name,
        email,
        password,
        deleted: false,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findFirst({
      where: {
        email,
      },
    });
  }
}

export { PrismaUsersRepository };
