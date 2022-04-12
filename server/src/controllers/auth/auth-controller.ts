import { NextFunction, Request, Response } from "express";
import config from "config";
import jwt from "jsonwebtoken";
import { createUser, loginUser } from "../../services/auth-service";

const jwtTokenSecret = config.get("jwtTokenSecret") as string;

// check for email reuse placed at DB level
export async function registerUserHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

  try {
    const user = await createUser({ email, password });
    return res.send(user);
  } catch (error) {
    next(error);
  }
}

// base authentication placed at DB level
export async function loginUserHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

  try {
    const user = await loginUser({ email, password });
    if (user) {
      const accessToken = jwt.sign({ email: user.email }, jwtTokenSecret, {
        expiresIn: 3600,
      });
      return res.send(accessToken);
    }
  } catch (error) {
    next(error);
  }
}
