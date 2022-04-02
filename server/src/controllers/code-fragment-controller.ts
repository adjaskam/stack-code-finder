import { NextFunction, Request, Response } from "express";
import {
  createCodeFragment,
  deleteAllCodeFragments,
  findAllCodeFragmentsBySearchPhrase,
  findAllCodeFragments,
} from "../services/code-fragment-service";
import { fetchQuestionsFromStackAPI } from "../api";
import CodeFragment, {
  CodeFragmentDocument,
  CodeFragmentEntity,
} from "../models/code-fragment-model";
import log from "../loggers";
import PuppeteerScraper from "../scrapers/PuppeteerScraper";
import config from "config";
import {
  getCodeBlocksContainsPhrase,
  getInternalQuestionsList,
} from "../scrapers/questions-converter";
import hash from "object-hash";
import { _FetchedQuestionsList } from "./types/code-fragment-types";
import { TaggedFragmentDto } from "../dtos/TaggedFragmentDto";
import { CodeFragmentsListDto } from "../dtos/CodeFragmentsListDto";
import ApiError from "../errors/ApiError";
import CheerioScraper from "../scrapers/CheerioScraper";
import { AppScraperInterface } from "../scrapers/AppScraperInterface";

const codeFragmentsFetchLimit = config.get("codeFragmentsFetchLimit") as number;
const FIND_BY_HTML_ELEMENT = "code" as string;
const SEARCH_XPATH = "//pre[contains(@class, 's-code-block')]" as string;

export async function fetchCodeFragmentsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let page = 0;
  try {
    const start = new Date().getTime();
    log.info(req.user?.id);
    let isRequestCancelledByClient = false;

    // to handle the case when client aborted the request
    // to not generate backend overload, we check that each iteration of mapping the question
    // if "isRequestCancelledByClient" is true -> throw an ApiError
    req.socket.on("close", (err: Error) => {
      isRequestCancelledByClient = true;
    });

    const taggedFragmentDto = new TaggedFragmentDto(
      req.body.tag,
      req.body.searchPhrase,
      req.body.amount
    );

    let scrapper: AppScraperInterface = new CheerioScraper(
      FIND_BY_HTML_ELEMENT
    );
    if (req.body.scraperType === "puppeteer") {
      scrapper = new PuppeteerScraper(SEARCH_XPATH);
    }

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
          if (isRequestCancelledByClient) {
            throw ApiError.badRequest(`REQUEST_CANCELLED_BY_CLIENT`);
          }
          let scrappedCodeFragment: string[] = [];
          try {
            scrappedCodeFragment = await scrapper.scrapCodeFragment(item.link);
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
                const end = new Date().getTime();
                const time = end - start;
                const codeFragmentsListDto = new CodeFragmentsListDto(
                  managedCodeFragments,
                  managedCodeFragments.length,
                  time
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
