import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "config";
import ApiError from "../errors/ApiError";

const jwtTokenSecret = config.get("jwtTokenSecret") as string;

export async function checkUserAuthStatus(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(403);

  try {
    const { email } = (await jwt.verify(token, jwtTokenSecret)) as {
      email: string;
    };
    req.user = { email: email };
  } catch (error) {
    next(ApiError.unauthorized(error.message));
  }
  next();
}
