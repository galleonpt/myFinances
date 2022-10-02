import { Request, Response } from "express";
import { PrismaUsersRepository } from "../../repositories/prisma/PrismaUsersRepository";
import { LoginUseCase } from "../../useCases/authentication/LoginUseCase";

class LoginController {
  async handle(request: Request, response: Response) {
    const usersRepository: PrismaUsersRepository = new PrismaUsersRepository();
    const loginUseCase = new LoginUseCase(usersRepository);

    const token: string | undefined = await loginUseCase.execute(request.body);

    if (token)
      return response.setHeader("authorization", token).status(200).end();
    else return response.status(500).json("Internal Server Error");
  }
}

export { LoginController };
