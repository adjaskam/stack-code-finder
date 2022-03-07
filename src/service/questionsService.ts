import { DocumentDefinition } from "mongoose";
import { InternalQuestion } from "../controller/questionsController";
import Question, { QuestionDocument } from "../model/questionModel";

// we should prevent storing Question duplicates -> findOneAndUpdate with upsert set to "true"
export async function createQuestion(
  input: InternalQuestion
): Promise<DocumentDefinition<QuestionDocument> | null> {
  try {
    return await Question.findOneAndUpdate(
      {
        questionId: input.questionId,
      },
      {
        link: input.link,
        title: input.title,
      },
      { upsert: true }
    );
  } catch (error) {
    throw new Error(error);
  }
}
