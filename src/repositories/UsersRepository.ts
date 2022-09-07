import { User } from "@prisma/client";

export interface CreateUserData {
  email: string;
  name: string;
  password: string;
}

export interface UsersRepositoty {
  create: (data: CreateUserData) => Promise<User>;
  findByEmail: (email: string) => Promise<User | null>;
}
