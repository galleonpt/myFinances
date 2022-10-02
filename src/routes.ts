import { Router } from "express";
import { LoginController } from "./controllers/authentication/LoginController";
import { CreateCategoryController } from "./controllers/categories/CreateCategoryController";
import { CreateUserController } from "./controllers/users/CreateUserController";
import { DeleteUserController } from "./controllers/users/DeleteUserController";
import { ListSingleUserController } from "./controllers/users/ListSingleUserController";
import { ListUsersController } from "./controllers/users/ListUsersController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const routes: Router = Router();

routes.post("/login", new LoginController().handle);

routes.post("/users", new CreateUserController().handle);
routes.get("/users", ensureAuthenticated, new ListUsersController().handle);
routes.get("/users/:id", new ListSingleUserController().handle);
routes.post("/users/:id", new DeleteUserController().handle);

routes.post(
  "/categories",
  ensureAuthenticated,
  new CreateCategoryController().handle
);

export { routes };
