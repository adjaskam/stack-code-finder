import CodeFragment, { CodeFragmentEntity } from "../model/codeFragmentModel";
import log from "../logger";

export async function createCodeFragment(
  codeFragment: CodeFragmentEntity
): Promise<CodeFragmentEntity | null> {
  try {
    return await CodeFragment.create(codeFragment);
  } catch (error) {
    log.error(error.message);
  }
  return null;
}
