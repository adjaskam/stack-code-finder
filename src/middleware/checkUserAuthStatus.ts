import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "config";
const tokenSecret = config.get("tokenSecret") as string;

export async function checkUserAuthStatus(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(403);

  try {
    const { id } = (await jwt.verify(token, tokenSecret)) as { id: string };
    req.user = { id: id };
  } catch (error) {
    return res.sendStatus(403);
  }
  next();
}
