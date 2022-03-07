import { InternalQuestion } from "../controller/questionsController";

type FetchedQuestion = {
  owner: {
    account_id: string;
  };
  question_id: string;
  link: string;
  title: string;
};

export function convertQuestionsToInfoInternalFormat(
  questions: FetchedQuestion[]
): InternalQuestion[] | undefined {
  // log.info(`Questions array: ${JSON.stringify(questions, null, "  ")}`);
  if (Array.isArray(questions) && questions.length > 0) {
    return questions.map((item) => ({
      questionId: item.question_id,
      link: item.link,
      title: item.title,
    }));
  }
  return undefined;
}
