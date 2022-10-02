import { JwtPayload } from "jsonwebtoken";

declare module "jsonwebtoken" {
  export interface IJwtPayload extends JwtPayload {
    email: string;
  }
}
