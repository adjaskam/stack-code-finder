import { Express, Request, Response } from "express";
import { createAppValueHandler } from "./controller/appvalue.controller";

export default function (app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));
  app.post("/api/appvalue", createAppValueHandler);
}
