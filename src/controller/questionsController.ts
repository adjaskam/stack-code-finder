import { Request, Response } from "express";
import { createQuestion } from "../service/questionsService";
import { fetchExampleDataFromStack } from "../api";
import { convertQuestionsToInfoInternalFormat } from "../converters/questionsConverter";
import Question, { QuestionDocument } from "../model/questionModel";
import { DocumentDefinition } from "mongoose";
import log from "../logger";
import { scrapCodeFragment } from "../converters/codeFragmentScrapper";

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

    const questions = await fetchExampleDataFromStack(taggedFragmentDto.tag);
    const mappedQuestions = convertQuestionsToInfoInternalFormat(
      questions.items
    );
    const updatedArray: DocumentDefinition<QuestionDocument>[] = [];

    if (mappedQuestions) {
      for (const item of mappedQuestions) {
        const managedQuestion = await createQuestion(
          item,
          taggedFragmentDto.tag
        );
        if (managedQuestion) {
          updatedArray.push(managedQuestion);
        }
      }
    }

    const questionsListDto: QuestionsListDto = {
      items: updatedArray,
      count: updatedArray.length,
    };
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
      count: questions.length,
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
    log.info(`req.params.tag: ${req.params.tag}`);
    const questions = await Question.find({ tag: req.params.tag });
    const questionsListDto: QuestionsListDto = {
      items: questions,
      count: questions.length,
    };
    return res.status(200).send(questionsListDto);
  } catch (error) {
    res.status(409).send(error.message);
  }
}

export async function deleteAllQuestionsHandler(req: Request, res: Response) {
  try {
    const questions = await Question.deleteMany({});
    return res.status(200).send(questions);
  } catch (error) {
    res.status(409).send(error.message);
  }
}

export async function deleteQuestionByQuestionIdHandler(req: Request, res: Response) {
  try {
    const question = await Question.deleteOne({questionId: req.params.questionId});
    return res.status(200).send(question);
  } catch (error) {
    res.status(409).send(error.message);
  }
}

export async function getCodeFragmentHandler(req: Request, res: Response) {
  try {
    return res.status(200).send(await scrapCodeFragment("cos"));
  } catch (error) {
    res.status(409).send(error.message);
  }
}
