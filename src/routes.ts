import { Router } from "express";
import { CreateUserController } from "./controllers/users/CreateUserController";

const routes: Router = Router();

routes.post("/users", new CreateUserController().handle);

export { routes };
