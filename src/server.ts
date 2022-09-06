import express, { Express } from "express";
import cors from "cors";
import { routes } from "./routes";

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(4000, () => console.log("Server running"));
