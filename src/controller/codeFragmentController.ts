import { NextFunction, Request, Response } from "express";
import {
  createCodeFragment,
  deleteAllCodeFragments,
  findAllCodeFragmentsBySearchPhrase,
  findAllCodeFragments,
} from "../service/codeFragmentService";
import { fetchQuestionsFromStackAPI } from "../api";
import CodeFragment, {
  CodeFragmentDocument,
  CodeFragmentEntity,
} from "../model/codeFragmentModel";
import log from "../logger";
import { scrapCodeFragment } from "../converter/codeFragmentScrapper";
import config from "config";
import {
  getCodeBlocksContainsPhrase,
  getInternalQuestionsList,
} from "../converter/questionsConverter";
import hash from "object-hash";
import { _FetchedQuestionsList } from "./types/codeFragmentTypes";
import { TaggedFragmentDto } from "../dto/TaggedFragmentDto";
import { CodeFragmentsListDto } from "../dto/CodeFragmentsListDto";
import { validationResult } from "express-validator";
import ApiError from "../error/ApiError";

const codeFragmentsFetchLimit = config.get("codeFragmentsFetchLimit") as number;

let page = 0;

export async function fetchCodeFragmentsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req).array();
  try {
    if (errors && errors.length) {
      return res.status(400).json({ errors });
    }
    log.info(req.user?.id);

    const taggedFragmentDto = new TaggedFragmentDto(
      req.body.tag,
      req.body.searchPhrase,
      req.body.amount
    );

    if (taggedFragmentDto.getAmount() > codeFragmentsFetchLimit) {
      throw ApiError.badRequest(
        `LIMIT_OF_${codeFragmentsFetchLimit}_CODE_FRAGMENTS_EXCEEDED`
      );
    }
    const managedCodeFragments: CodeFragmentEntity[] = [];
    do {
      const fetchedQuestions: _FetchedQuestionsList =
        await fetchQuestionsFromStackAPI(taggedFragmentDto.getTag(), ++page);

      const mappedQuestions = getInternalQuestionsList(fetchedQuestions.items);
      const existingCodeFragments: CodeFragmentDocument[] =
        await CodeFragment.find();
      const existingHashes = existingCodeFragments.map((x) => x.hashMessage);

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
              taggedFragmentDto.getSearchPhrase()
            );
            log.info(`RESULT_LENGTH: ${results.length}`);

            for (const index in results) {
              const codeBlock = results[index];
              const codeBlockHash = hash.MD5(`${item.questionId}.${codeBlock}`);
              log.info(`PROCESSED_CODE_BLOCK: ${codeBlock}`);
              log.info(`PROCESSED_CODE_BLOCK_MD5: ${codeBlockHash}`);
              log.info(
                `MD5_ALREADY_USED_VALUE: ${existingHashes.includes(
                  codeBlockHash
                )}`
              );

              if (existingHashes.includes(codeBlockHash)) continue;

              const managedCodeFragment = await createCodeFragment({
                questionId: item.questionId,
                tag: taggedFragmentDto.getTag(),
                searchPhrase: taggedFragmentDto.getSearchPhrase(),
                codeFragment: codeBlock,
                hashMessage: codeBlockHash,
              });

              if (managedCodeFragment) {
                managedCodeFragments.push(managedCodeFragment);
              }
              log.info(`MANAGED_CODE_BLOCK_CONTENT: ${managedCodeFragment}`);

              if (
                managedCodeFragments.length == taggedFragmentDto.getAmount()
              ) {
                const codeFragmentsListDto = new CodeFragmentsListDto(
                  managedCodeFragments,
                  managedCodeFragments.length
                );
                return res.send(codeFragmentsListDto);
              }
            }
          }
        }
      }
    } while (managedCodeFragments.length < taggedFragmentDto.getAmount());
  } catch (error) {
    next(error);
  }
}

export async function getAllCodeFragmentsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const codeFragments = await findAllCodeFragments();
    const codeFragmentsListDto = new CodeFragmentsListDto(
      codeFragments,
      codeFragments.length
    );
    return res.status(200).send(codeFragmentsListDto);
  } catch (error) {
    next(error);
  }
}

export async function getAllCodeFragmentsBySearchPhraseHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const codeFragments = await findAllCodeFragmentsBySearchPhrase(
      req.params.searchPhrase
    );
    const codeFragmentsListDto = new CodeFragmentsListDto(
      codeFragments,
      codeFragments.length
    );
    return res.status(200).send(codeFragmentsListDto);
  } catch (error) {
    next(error);
  }
}

export async function deleteAllCodeFragmentsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const codeFragments = await deleteAllCodeFragments();
    return res.status(200).send(codeFragments);
  } catch (error) {
    next(error);
  }
}
