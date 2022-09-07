import { User } from "@prisma/client";
import Joi, { ObjectSchema } from "joi";
import { CustomError } from "../../exceptions/CustomError";
import {
  CreateUserData,
  UsersRepositoty,
} from "../../repositories/UsersRepository";

class CreateUserUseCase {
  constructor(private usersRepository: UsersRepositoty) {}

  async execute(body: CreateUserData): Promise<User | void> {
    const schema: ObjectSchema<CreateUserData> = Joi.object({
      name: Joi.string().required(),
      password: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
    });

    const { error } = schema.validate(body);

    if (error) {
      throw new CustomError({ message: error.message, status: 422 });
    }

    if (await this.usersRepository.findByEmail(body.email)) {
      throw new CustomError({
        message: "Email already registered!",
        status: 409,
      });
    }

    return this.usersRepository.create(body);
  }
}

export { CreateUserUseCase };
