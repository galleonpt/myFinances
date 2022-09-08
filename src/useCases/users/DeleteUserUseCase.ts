import { CustomError } from "../../exceptions/CustomError";
import { UsersRepository } from "../../repositories/UsersRepository";

class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: number): Promise<void> {
    if (await this.usersRepository.findById(id)) {
      await this.usersRepository.deleteById(id);
      return;
    } else {
      throw new CustomError({ message: "Invalid user" });
    }
  }
}

export { DeleteUserUseCase };
