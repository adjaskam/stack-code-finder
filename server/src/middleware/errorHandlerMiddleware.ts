import { NextFunction, Request, Response } from "express";
import ApiError from "../error/ApiError";
import log from "../logger";
import ValidationError from "../error/ValidationError";

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
}
