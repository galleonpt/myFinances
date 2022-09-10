import { User } from "@prisma/client";
import { Request, Response } from "express";
import { PrismaUsersRepository } from "../../repositories/prisma/PrismaUsersRepository";
import { ListSingleUserUseCase } from "../../useCases/users/ListSingleUserUseCase";

class ListSingleUserController {
  async handle(request: Request, response: Response) {
    const usersRepository: PrismaUsersRepository = new PrismaUsersRepository();
    const listSingleUserUseCase = new ListSingleUserUseCase(usersRepository);

    const user: Partial<User> = await listSingleUserUseCase.execute(
      +request.params.id
    );

    return response.status(200).json(user);
  }
}

export { ListSingleUserController };
