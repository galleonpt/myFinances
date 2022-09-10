import { Router } from "express";
import { CreateUserController } from "./controllers/users/CreateUserController";
import { DeleteUserController } from "./controllers/users/DeleteUserController";
import { ListSingleUserController } from "./controllers/users/ListSingleUserController";
import { ListUsersController } from "./controllers/users/ListUsersController";

const routes: Router = Router();

routes.post("/users", new CreateUserController().handle);
routes.get("/users", new ListUsersController().handle);
routes.get("/users/:id", new ListSingleUserController().handle);
routes.post("/users/:id", new DeleteUserController().handle);

export { routes };
