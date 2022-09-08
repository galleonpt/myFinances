import { Router } from "express";
import { CreateUserController } from "./controllers/users/CreateUserController";
import { ListUsersController } from "./controllers/users/ListUsersController";

const routes: Router = Router();

routes.post("/users", new CreateUserController().handle);
routes.get("/users", new ListUsersController().handle);

export { routes };
