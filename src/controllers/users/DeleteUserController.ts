import { Request, Response } from "express";
import { PrismaUsersRepository } from "../../repositories/prisma/PrismaUsersRepository";
import { DeleteUserUseCase } from "../../useCases/users/DeleteUserUseCase";

class DeleteUserController {
  async handle(request: Request, response: Response) {
    const usersRepository: PrismaUsersRepository = new PrismaUsersRepository();
    const deleteUserUseCase = new DeleteUserUseCase(usersRepository);

    await deleteUserUseCase.execute(+request.params.id);

    return response.status(204).end();
  }
}

export { DeleteUserController };
