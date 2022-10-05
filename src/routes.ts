import { Router } from "express";
import { LoginController } from "./controllers/authentication/LoginController";
import { CreateCategoryController } from "./controllers/categories/CreateCategoryController";
import { ListCategoriesController } from "./controllers/categories/ListCategoriesController";
import { CreateExpenseController } from "./controllers/expenses/CreateExpenseController";
import { ListExpensesController } from "./controllers/expenses/ListExpensesController";
import { CreateUserController } from "./controllers/users/CreateUserController";
import { DeleteUserController } from "./controllers/users/DeleteUserController";
import { ListSingleUserController } from "./controllers/users/ListSingleUserController";
import { ListUsersController } from "./controllers/users/ListUsersController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const routes: Router = Router();

routes.get("", (_, response) => {
  return response.json({ success: "YEAH!!!" });
});

routes.post("/login", new LoginController().handle);

//users
routes.post("/users", new CreateUserController().handle);
routes.get("/users", ensureAuthenticated, new ListUsersController().handle);
routes.get("/users/:id", new ListSingleUserController().handle);
routes.post("/users/:id", new DeleteUserController().handle);

//categories
routes.post(
  "/categories",
  ensureAuthenticated,
  new CreateCategoryController().handle
);

routes.get(
  "/categories",
  ensureAuthenticated,
  new ListCategoriesController().handle
);

//expenses
routes.post(
  "/expenses",
  ensureAuthenticated,
  new CreateExpenseController().handle
);

routes.get(
  "/expenses",
  ensureAuthenticated,
  new ListExpensesController().handle
);

export { routes };
