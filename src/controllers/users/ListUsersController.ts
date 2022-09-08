import { User } from "@prisma/client";
import { Request, Response } from "express";
import { PrismaUsersRepository } from "../../repositories/prisma/PrismaUsersRepository";
import { ListUsersUseCase } from "../../useCases/users/ListUsersUseCase";

class ListUsersController {
  async handle(request: Request, response: Response) {
    const usersRepository: PrismaUsersRepository = new PrismaUsersRepository();
    const listUsersService = new ListUsersUseCase(usersRepository);

    const list: Partial<User>[] = await listUsersService.execute();

    return response.json(list);
  }
}

export { ListUsersController };
