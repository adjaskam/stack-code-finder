import { DocumentDefinition } from "mongoose";
import AppValue, { AppValueDocument } from "../model/appvalue.model";

export async function createAppValue(
  input: DocumentDefinition<AppValueDocument>
) {
  try {
    return await AppValue.create(input);
  } catch (error) {
    throw new Error(error);
  }
}

export async function findAllAppValues() {
  try {
    return await AppValue.find();
  } catch (error) {
    throw new Error(error);
  }
}
