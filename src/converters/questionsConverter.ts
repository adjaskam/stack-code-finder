import { InternalQuestion } from "../controller/questionsController";
import { FetchedQuestion } from "../controller/questionsController";

export function convertQuestionsToInfoInternalFormat(
  questions: FetchedQuestion[]
): InternalQuestion[] | undefined {
  if (Array.isArray(questions) && questions.length > 0) {
    return questions.map((item) => ({
      questionId: item.question_id,
      link: item.link,
      title: item.title,
    }));
  }
  return undefined;
}
