import { User } from "@prisma/client";
import { CustomError } from "../../exceptions/CustomError";
import { UsersRepository } from "../../repositories/UsersRepository";

class ListSingleUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: number): Promise<Partial<User>> {
    const user: Partial<User> | null = await this.usersRepository.findById(id);

    if (!user) {
      throw new CustomError({ message: "Invalid user" });
    } else return user;
  }
}

export { ListSingleUserUseCase };
