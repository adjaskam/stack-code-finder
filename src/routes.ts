import { Express, Request, Response } from "express";
import { createAppValueHandler, findAllAppValuesHandler } from "./controller/appvalue.controller";
import { fetchExampleDataFromStack } from "./api"

export default function (app: Express) {
  app.get("/healthcheck", fetchExampleDataFromStack);
  app.post("/api/appvalue", createAppValueHandler);
  app.get("/api/appvalue", findAllAppValuesHandler);
}
