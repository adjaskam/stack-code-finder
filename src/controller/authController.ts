import { Request, Response } from "express";
import config from "config";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { createUser, loginUser } from "../service/authService";

const tokenSecret = config.get("tokenSecret") as string;

// check for email reuse placed at DB level
export async function registerUserHandler(req: Request, res: Response) {
  const errors = validationResult(req).array();
  if (errors && errors.length) {
    return res.status(400).json({ errors });
  }
  const { email, password } = req.body;

  try {
    const user = await createUser({ email, password });
    return res.send(user);
  } catch (error) {
    return res.status(401).send(error.message);
  }
}

// base authentication placed at DB level
export async function loginUserHandler(req: Request, res: Response) {
  const errors = validationResult(req).array();
  if (errors && errors.length) {
    return res.status(400).json({ errors });
  }
  const { email, password } = req.body;

  try {
    const user = await loginUser({ email, password });
    if (user) {
      const accessToken = jwt.sign({ id: user.email }, tokenSecret, {
        expiresIn: 3600,
      });
      return res.send(accessToken);
    }
  } catch (error) {
    return res.status(401).send(error.message);
  }
}