import { NextFunction, Request, Response } from "express";
import ApiError from "../errors/ApiError";
import log from "../loggers";
import ValidationError from "../errors/ValidationError";

export async function handleApplicationError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  log.error(err);

  if (err instanceof ApiError) {
    return res.status(err.code).send(err.message);
  }

  if (err instanceof ValidationError) {
    return res.status(400).send(err.validationResults);
  }

  return res.status(500).send("Something went wrong");
}
