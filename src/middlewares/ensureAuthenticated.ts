import { NextFunction, Request, Response } from "express";
import { IJwtPayload, verify } from "jsonwebtoken";

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken: string | undefined = request.headers.authorization;

  if (!authToken) return response.status(401).end();

  const [, token] = authToken.split(" ");

  try {
    if (process.env.JWT_SECRET) {
      const info: IJwtPayload = verify(
        token,
        process.env.JWT_SECRET
      ) as IJwtPayload;

      if (info.sub) request.id = +info.sub;
      if (info.email) request.email = info.email;

      return next();
    }
  } catch (e) {
    console.log(e);
    return response.status(401).end();
  }
}
