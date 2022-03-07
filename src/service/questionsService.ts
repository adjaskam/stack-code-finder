import { DocumentDefinition } from "mongoose";
import { InternalQuestion } from "../controller/questionsController";
import Question, { QuestionDocument } from "../model/questionModel";
import log from "../logger";

// we should prevent storing Question duplicates -> findOneAndUpdate with upsert set to "true"
export async function createQuestion(
  input: InternalQuestion,
  tag: String
): Promise<DocumentDefinition<QuestionDocument> | null> {
  try {
    return await Question.create({
      questionId: input.questionId,
      link: input.link,
      title: input.title,
      tag: tag,
    });
  } catch (error) {
    log.error(error.message);
  }
  return null;
}
