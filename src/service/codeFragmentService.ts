import { DocumentDefinition } from "mongoose";
import Question, { CodeFragmentDocument } from "../model/codeFragmentModel";
import log from "../logger";
import { CodeFragment } from "../controller/types";

export async function createCodeFragment(
  codeFragment: CodeFragment
): Promise<DocumentDefinition<CodeFragmentDocument> | null> {
  try {
    return await Question.create(codeFragment);
  } catch (error) {
    log.error(error.message);
  }
  return null;
}
