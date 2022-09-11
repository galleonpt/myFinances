import { User } from "@prisma/client";
import Joi, { ObjectSchema } from "joi";
import { CustomError } from "../../exceptions/CustomError";
import {
  CreateUserData,
  UsersRepository,
} from "../../repositories/UsersRepository";
import { hash } from "bcryptjs";
import { environment } from "../../environments";

class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(body: CreateUserData): Promise<Partial<User>> {
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

    body.password = await hash(body.password, +environment.SALT);

    return this.usersRepository.create(body);
  }
}

export { CreateUserUseCase };
