import { Request, Response } from "express";
import { createAppValue } from "../service/appvalue.service";

export async function createAppValueHandler(req: Request, res: Response) {
  try {
    const appValue = await createAppValue(req.body);
    return res.send(appValue.toJSON());
  } catch (error) {
    res.status(409).send(error.message);
  }
}
