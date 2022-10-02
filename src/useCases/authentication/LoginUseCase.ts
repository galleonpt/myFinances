import { User } from "@prisma/client";
import Joi, { ObjectSchema } from "joi";
import { CustomError } from "../../exceptions/CustomError";
import { UsersRepository } from "../../repositories/UsersRepository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface ILoginPayload {
  email: string;
  password: string;
}

class LoginUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(body: ILoginPayload): Promise<string | undefined> {
    const schema: ObjectSchema<ILoginPayload> = Joi.object({
      password: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
    });

    const user: User | null = await this.usersRepository.findByEmail(
      body.email
    );

    const { error } = schema.validate(body);

    if (error) {
      throw new CustomError({ message: error.message, status: 422 });
    }

    if (!user) throw new CustomError({ message: "Invalid creadentials" });

    if (!(await compare(body.password, user.password)))
      throw new CustomError({ message: "Invalid creadentials" });

    if (process.env.JWT_SECRET) {
      return sign(
        {
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          subject: String(user.id),
          expiresIn: "1d",
        }
      );
    }

    return;
  }
}

export { LoginUseCase };
