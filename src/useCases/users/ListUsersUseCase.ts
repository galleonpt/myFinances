import { User } from "@prisma/client";
import { UsersRepository } from "../../repositories/UsersRepository";

class ListUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<Partial<User>[]> {
    return this.usersRepository.getAll();
  }
}

export { ListUsersUseCase };
