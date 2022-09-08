import { User } from "@prisma/client";

export interface CreateUserData {
  email: string;
  name: string;
  password: string;
}

export interface UsersRepository {
  create: (data: CreateUserData) => Promise<Partial<User>>;
  findByEmail: (email: string) => Promise<User | null>;
  getAll: () => Promise<Partial<User>[]>;
  findById: (id: number) => Promise<User | null>;
  deleteById: (id: number) => Promise<User>;
}
