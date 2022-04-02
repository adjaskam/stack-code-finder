import CodeFragment, { CodeFragmentEntity } from "../models/code-fragment-model";
import ApiError from "../errors/ApiError";
import { DeleteResult } from "mongodb";

export async function createCodeFragment(
  codeFragment: CodeFragmentEntity
): Promise<CodeFragmentEntity | null> {
  try {
    return await CodeFragment.create(codeFragment);
  } catch (error) {
    throw ApiError.badRequest(error.message);
  }
}

export async function findAllCodeFragments(): Promise<CodeFragmentEntity[]> {
  try {
    return await CodeFragment.find();
  } catch (error) {
    throw ApiError.badRequest(error.message);
  }
}

export async function findAllCodeFragmentsBySearchPhrase(
  searchPhrase: string
): Promise<CodeFragmentEntity[]> {
  try {
    return await CodeFragment.find({ searchPhrase: searchPhrase });
  } catch (error) {
    throw ApiError.badRequest(error.message);
  }
}

export async function deleteAllCodeFragments(): Promise<DeleteResult> {
  try {
    return await CodeFragment.deleteMany({});
  } catch (error) {
    throw ApiError.badRequest(error.message);
  }
}
