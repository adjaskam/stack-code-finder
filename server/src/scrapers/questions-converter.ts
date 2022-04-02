import { InternalQuestion, _FetchedQuestion } from "../controllers/types/code-fragment-types";

export function getInternalQuestionsList(
  fetchedQuestions: _FetchedQuestion[]
): InternalQuestion[] | undefined {
  if (Array.isArray(fetchedQuestions) && fetchedQuestions.length > 0) {
    return fetchedQuestions.map((item) => ({
      questionId: item.question_id,
      link: item.link,
      title: item.title,
    }));
  }
}

export function getCodeBlocksContainsPhrase(
  fetchedCodeBlocks: string[],
  searchPhrase: string
): string[] {
  return fetchedCodeBlocks.filter((codeBlock) =>
    codeBlock.includes(searchPhrase)
  );
}
