import { Request, Response } from "express";
import { createQuestion } from "../service/questionsService";
import { fetchExampleDataFromStack } from "../api";
import { convertQuestionsToInfoInternalFormat } from "../converters/questionsConverter";
import Question, { QuestionDocument } from "../model/questionModel";
import { DocumentDefinition } from "mongoose";
import log from "../logger";

export type TaggedCodeFragment = {
  tag: string;
  codeFragment: string;
};

export type QuestionsListDto = {
  items: DocumentDefinition<QuestionDocument>[];
  count: number;
};

export type InternalQuestion = {
  questionId: string;
  title: string;
  link: string;
};

export async function fetchQuestionsHandler(req: Request, res: Response) {
  try {
    const taggedFragmentDto: TaggedCodeFragment = {
      tag: req.body.tag,
      codeFragment: req.body.codeFragment,
    };
    // log.info(`TaggedFragmentDto object: ${JSON.stringify(taggedFragmentDto)}`);

    const questions = await fetchExampleDataFromStack(taggedFragmentDto.tag);
    // log.info(`Fetched Questions array: ${JSON.stringify(questions)}`);

    const mappedQuestions = convertQuestionsToInfoInternalFormat(questions.items);
    const updatedArray: DocumentDefinition<QuestionDocument>[] = [];
    
    // log.info(`mappedQuestions array: ${JSON.stringify(mappedQuestions)}`);
    if (mappedQuestions) {
      for (const item of mappedQuestions) {
        const managedQuestion = await createQuestion(item);
        // log.info(`managedQuestion: ${JSON.stringify(managedQuestion)}`);
        if (managedQuestion) {
          updatedArray.push(managedQuestion);
        }
      }
    }

    const questionsListDto: QuestionsListDto = {
      items: updatedArray,
      count: updatedArray.length
    }
    // log.info(`Fetched Questions array: ${JSON.stringify(updatedArray)}`);
    return res.send(questionsListDto);
  } catch (error) {
    res.status(409).send(error.message);
  }
}

export async function getAllQuestionsHandler(req: Request, res: Response) {
  try {
    const questions = await Question.find();
    const questionsListDto: QuestionsListDto = {
      items: questions,
      count: questions.length
    };
    return res.status(200).send(questionsListDto);
  } catch (error) {
    res.status(409).send(error.message);
  }
}

export async function getAllQuestionsForTagHandler(
  req: Request,
  res: Response
) {
  try {
    const questions = await Question.find({ tag: req.params.tag });
    const questionsListDto: QuestionsListDto = {
      items: questions,
      count: questions.length
    };
    return res.status(200).send(questionsListDto);
  } catch (error) {
    res.status(409).send(error.message);
  }
}
