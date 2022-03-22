import { NextFunction, Request, Response } from "express";
import config from "config";
import { validationResult } from "express-validator";
import jwt, { JwtPayload } from "jsonwebtoken";
import { createUser, loginUser } from "../service/authService";

const tokenSecret = config.get("tokenSecret") as string;
const refreshTokenSecret = config.get("refreshTokenSecret") as string;

export async function registerUserHandler(req: Request, res: Response) {
  const errors = validationResult(req).array();
  if (errors && errors.length) {
    return res.status(400).json({ errors });
  }
  const { email, password } = req.body;

  try {
    const user = await createUser({ email, password });
    res.sendStatus(201).json(user);
  } catch (error) {
    res.sendStatus(400);
  }
}

export async function loginUserHandler(req: Request, res: Response) {
  const errors = validationResult(req).array();
  if (errors && errors.length) {
    return res.status(400).json({ errors });
  }
  const { email, password } = req.body;
  try {
    const user = await loginUser({ email, password });
    res.sendStatus(201).json(user);
  } catch (error) {
    res.sendStatus(400);
  }

  const accessToken = jwt.sign({ id: 1 }, tokenSecret, { expiresIn: 3600 });
  const refreshToken = jwt.sign({ id: 1 }, refreshTokenSecret, {
    expiresIn: 3600,
  });
  res.send({ accessToken, refreshToken });
}

export async function refreshUserToken(req: Request, res: Response) {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.sendStatus(401);

  try {
    await jwt.verify(refreshToken, refreshTokenSecret);
  } catch (error) {
    return res.sendStatus(403);
  }
  const accessToken = jwt.sign({ id: 1 }, tokenSecret, { expiresIn: 3600 });
  return res.send({ accessToken });
}

export async function deserializeUserEntity(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  let payload: JwtPayload | string;
  try {
    payload = await jwt.verify(token, tokenSecret);
  } catch (error) {
    return res.sendStatus(403);
  }
  next();
}
