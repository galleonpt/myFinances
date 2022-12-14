import "dotenv/config";
import express, { Express, NextFunction, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import { routes } from "./routes";
import { CustomError } from "./exceptions/CustomError";
import { fillCurrenciesTable } from "./bin/fillCurrenciesTable";

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(routes);

fillCurrenciesTable();

app.use(
  (err: any, _request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof CustomError) {
      return response
        .status(err.status)
        .json({
          error: err.message,
        })
        .end();
    }

    if (err instanceof Error) {
      return response.status(400).json({
        error: err.message,
      });
    }

    return response
      .status(500)
      .json({
        message: "Internal server error!",
      })
      .end();
  }
);

export { app };
