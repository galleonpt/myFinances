import { Router } from "express";

const routes: Router = Router();

routes.get("/", (req, res) => {
  return res.send("working");
});

export { routes };
