import { Request, Response } from "express";
import { createCodeFragment } from "../service/codeFragmentService";
import { fetchExampleDataFromStack } from "../api";
import CodeFragment, { CodeFragmentDocument } from "../model/codeFragmentModel";
import { DocumentDefinition } from "mongoose";
import log from "../logger";
import { scrapCodeFragment } from "../converters/codeFragmentScrapper";
import config from "config";
import FetchCodeFragmentError from "../exception/FetchCodeFragmentError";
import { getCodeBlocksContainsPhrase } from "../converters/questionsConverter";
import hash from "object-hash";

export type TaggedCodeFragment = {
  tag: string;
  searchPhrase: string;
  amount: number;
};

export type CodeFragmentsListDto = {
  items: DocumentDefinition<CodeFragmentDocument>[];
  count: number;
};

export type InternalQuestion = {
  questionId: string;
  title: string;
  link: string;
};

export type CodeFragment = {
  questionId: String;
  tag: String;
  searchPhrase: String;
  codeFragment: String;
  hashMessage: String;
};

type FetchedQuestion = {
  owner: {
    account_id: string;
  };
  question_id: string;
  link: string;
  title: string;
};

type StackApiResponse = Response & {
  items?: FetchedQuestion[];
};

const codeFragmentsFetchLimit = config.get("codeFragmentsFetchLimit") as number;

export async function fetchCodeFragmentsHandler(req: Request, res: Response) {
  try {
    const taggedFragmentDto: TaggedCodeFragment = {
      tag: req.body.tag,
      searchPhrase: req.body.searchPhrase,
      amount: req.body.amount,
    };
    console.log("TaggedFragmentDto", taggedFragmentDto);

    const page = 0;
    if (taggedFragmentDto.amount > codeFragmentsFetchLimit) {
      throw new FetchCodeFragmentError(
        "The limit of 10 code fragments has been exceeded",
        400
      );
    }

    // fetch until the limit is reached
    const managedCodeFragments: DocumentDefinition<CodeFragmentDocument>[] = [];
    do {
      // const amountToFetch = taggedFragmentDto.amount - updatedArray.length;
      let newPage = page + 1;
      const fetchedQuestions: { items: FetchedQuestion[] } =
        await fetchExampleDataFromStack(taggedFragmentDto.tag, newPage);

      let mappedQuestions;
      if (
        Array.isArray(fetchedQuestions.items) &&
        fetchedQuestions.items.length > 0
      ) {
        mappedQuestions = fetchedQuestions.items.map((item) => ({
          questionId: item.question_id,
          link: item.link,
          title: item.title,
        }));
      }

      const existingCodeFragments = await CodeFragment.find();
      const existingHashes = existingCodeFragments.map((x) => x.hashMessage);

      // scrap code fragment
      if (mappedQuestions) {
        for (const item of mappedQuestions) {
          let scrappedCodeFragment: string[] = [];
          try {
            scrappedCodeFragment = await scrapCodeFragment(item.link);
          } catch (error) {
            log.error(error.message);
          }
          if (scrappedCodeFragment?.length > 0) {
            const results = getCodeBlocksContainsPhrase(
              scrappedCodeFragment,
              taggedFragmentDto.searchPhrase
            );
            log.info(`Result length: ${results.length}`);
            for (const index in results) {
              const codeBlock = results[index];
              const codeBlockHash = hash.MD5(`${item.questionId}.${codeBlock}`);
              log.info(`Processed code block: ${codeBlock}`);
              log.info(`Processed code block MD5 hash: ${codeBlockHash}`);
              log.info(
                `MD5 hash already exists: ${existingHashes.includes(
                  codeBlockHash
                )}`
              );

              if (existingHashes.includes(codeBlockHash)) continue;

              const managedCodeFragment = await createCodeFragment({
                questionId: item.questionId,
                tag: taggedFragmentDto.tag,
                searchPhrase: taggedFragmentDto.searchPhrase,
                codeFragment: codeBlock,
                hashMessage: codeBlockHash,
              });

              if (managedCodeFragment) {
                managedCodeFragments.push(managedCodeFragment);
              }
              log.info(`Managed code block: ${managedCodeFragment}`);

              if (managedCodeFragments.length === taggedFragmentDto.amount) {
                const codeFragmentsListDto: CodeFragmentsListDto = {
                  items: managedCodeFragments,
                  count: managedCodeFragments.length,
                };
                return res.send(codeFragmentsListDto);
              }
            }
          }
        }
      }
    } while (managedCodeFragments.length < taggedFragmentDto.amount);
  } catch (error) {
    if (error instanceof FetchCodeFragmentError) {
      const code = error.getErrorCode();
      return res.status(code).send(error.message);
    }
    res.status(409).send(error.message);
  }
}

export async function getAllCodeFragmentsHandler(req: Request, res: Response) {
  try {
    const codeFragments = await CodeFragment.find();
    const codeFragmentsListDto: CodeFragmentsListDto = {
      items: codeFragments,
      count: codeFragments.length,
    };
    return res.status(200).send(codeFragmentsListDto);
  } catch (error) {
    return res.status(409).send(error.message);
  }
}

export async function getAllCodeFragmentsBySearchPhraseHandler(
  req: Request,
  res: Response
) {
  try {
    log.info(`req.params.searchPhrase: ${req.params.searchPhrase}`);
    const codeFragments = await CodeFragment.find({
      searchPhrase: req.params.searchPhrase,
    });
    const codeFragmentsListDto: CodeFragmentsListDto = {
      items: codeFragments,
      count: codeFragments.length,
    };
    return res.status(200).send(codeFragmentsListDto);
  } catch (error) {
    res.status(409).send(error.message);
  }
}

export async function deleteAllCodeFragmentsHandler(
  req: Request,
  res: Response
) {
  try {
    const codeFragments = await CodeFragment.deleteMany({});
    return res.status(200).send(codeFragments);
  } catch (error) {
    res.status(409).send(error.message);
  }
}

// export async function deleteQuestionByQuestionIdHandler(
//   req: Request,
//   res: Response
// ) {
//   try {
//     const question = await Question.deleteOne({
//       questionId: req.params.questionId,
//     });
//     return res.status(200).send(question);
//   } catch (error) {
//     res.status(409).send(error.message);
//   }
// }
