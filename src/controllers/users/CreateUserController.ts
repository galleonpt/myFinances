import { User } from "@prisma/client";
import { Request, Response } from "express";
import { PrismaUsersRepository } from "../../repositories/prisma/PrismaUsersRepository";
import { CreateUserUseCase } from "../../useCases/users/CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const usersRepository: PrismaUsersRepository = new PrismaUsersRepository();
    const createUserUseCase = new CreateUserUseCase(usersRepository);

    const user: Partial<User> = await createUserUseCase.execute(request.body);

    return response.status(201).json(user);
  }
}

export { CreateUserController };
