import { Request, Response } from "express";
import { createAppValue, findAllAppValues } from "../service/appvalue.service";

export async function createAppValueHandler(req: Request, res: Response) {
  try {
    const appValue = await createAppValue(req.body);
    return res.send(appValue.toJSON());
  } catch (error) {
    res.status(409).send(error.message);
  }
}

export async function findAllAppValuesHandler(req: Request, res: Response) {
  try {
    const appValue = await findAllAppValues();
    return res.send(appValue);
  } catch (error) {
    res.status(409).send(error.message);
  }
}