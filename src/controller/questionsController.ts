import { Request, Response } from "express";
import { createQuestion } from "../service/questionsService";
import { fetchExampleDataFromStack } from "../api";
import { convertQuestionsToInfoInternalFormat } from "../converters/questionsConverter";
import Question, { QuestionDocument } from "../model/questionModel";
import { DocumentDefinition } from "mongoose";
import log from "../logger";
import { scrapCodeFragment } from "../converters/codeFragmentScrapper";
import config from "config";
import FetchQuestionError from "../exception/FetchQuestionsError";

export type TaggedCodeFragment = {
  tag: string;
  codeFragment: string;
  amount: number;
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

export type FetchedQuestion = {
  owner: {
    account_id: string;
  };
  question_id: string;
  link: string;
  title: string;
};

const codeFragmentsFetchLimit = config.get("codeFragmentsFetchLimit") as number;

export async function fetchQuestionsHandler(req: Request, res: Response) {
  try {
    const taggedFragmentDto: TaggedCodeFragment = {
      tag: req.body.tag,
      codeFragment: req.body.codeFragment,
      amount: req.body.amount,
    };
    const page = 0;
    if (taggedFragmentDto.amount > codeFragmentsFetchLimit) {
      throw new FetchQuestionError(
        "The limit of 10 code fragments has been exceeded",
        400
      );
    }

    // fetch until the limit is reached
    const updatedArray: DocumentDefinition<QuestionDocument>[] = [];
    do {
      const amountToFetch = taggedFragmentDto.amount - updatedArray.length;
      const fetchedData = await fetchExampleDataFromStack(
        taggedFragmentDto.tag,
        amountToFetch,
        page + 1
      );

      // map question to internal format
      const mappedQuestions = convertQuestionsToInfoInternalFormat(fetchedData.items);

      // scrap code fragment
      if (mappedQuestions) {
        for (const item of mappedQuestions) {
          const scrappedCodeFragment = await scrapCodeFragment(item.link);
          let managedQuestion;
          if (scrappedCodeFragment.length > 0) {
            managedQuestion = await createQuestion(
              item,
              taggedFragmentDto.tag,
              scrappedCodeFragment
            );
          }
          if (managedQuestion) {
            updatedArray.push(managedQuestion);
          }
        }
      }
    } while (updatedArray.length < taggedFragmentDto.amount);

    const questionsListDto: QuestionsListDto = {
      items: updatedArray,
      count: updatedArray.length,
    };
    return res.send(questionsListDto);
  } catch (error) {
    if (error instanceof FetchQuestionError) {
      const code = error.getErrorCode();
      return res.status(code).send(error.message);
    }
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
    return res.status(409).send(error.message);
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

export async function deleteQuestionByQuestionIdHandler(
  req: Request,
  res: Response
) {
  try {
    const question = await Question.deleteOne({
      questionId: req.params.questionId,
    });
    return res.status(200).send(question);
  } catch (error) {
    res.status(409).send(error.message);
  }
}
