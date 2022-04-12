import { NextFunction, Request, Response } from "express";
import _omit from "lodash.omit";
import {
  createCodeFragment,
  deleteAllCodeFragments,
  findAllCodeFragments,
  findOneAndUpdateCodeFragment,
  findPaginatedCodeFragmentsByUser,
  countAllCodeFragmentsByUser,
  deleteCodeFragment,
  findAllCodeFragmentsByUser,
} from "../../services/code-fragment-service";
import { fetchQuestionsFromStackAPI } from "../../api";
import { CodeFragmentEntity } from "../../models/model-types";
import log from "../../loggers";
import PuppeteerScraper from "../../scrapers/PuppeteerScraper";
import config from "config";
import {
  getCodeBlocksContainsPhrase,
  getInternalQuestionsList,
} from "../utils/questions-converter";
import hash from "object-hash";
import { InternalQuestion, _FetchedQuestionsList } from "./code-fragment-types";
import { TaggedFragmentDto } from "../../dtos/TaggedFragmentDto";
import { CodeFragmentsListDto } from "../../dtos/CodeFragmentsListDto";
import ApiError from "../../errors/ApiError";
import CheerioScraper from "../../scrapers/CheerioScraper";
import { AppScraperInterface } from "../../scrapers/AppScraperInterface";

const FIND_BY_HTML_ELEMENT = "code" as string;
const SEARCH_XPATH = "//pre[contains(@class, 's-code-block')]" as string;

const codeFragmentsFetchLimit = config.get("codeFragmentsFetchLimit") as number;

export async function fetchCodeFragmentsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let page = 0;
  try {
    const start = new Date().getTime();
    let isRequestCancelledByClient = false;

    const taggedFragmentDto = new TaggedFragmentDto(
      req.body.tag,
      req.body.searchPhrase,
      req.body.amount
    );

    const userEmail = req.user?.email;
    if (!userEmail) {
      throw ApiError.badRequest(`CANNOT_FOUND_AUTHENTICATED_USER`);
    }

    if (taggedFragmentDto.getAmount() > codeFragmentsFetchLimit) {
      throw ApiError.badRequest(
        `LIMIT_OF_${codeFragmentsFetchLimit}_CODE_FRAGMENTS_EXCEEDED`
      );
    }

    // to handle the case when client aborted the request
    // to not generate backend overload, we check that each iteration of mapping the question
    // if "isRequestCancelledByClient" is true -> throw an ApiError
    req.socket.on("close", (err: Error) => {
      isRequestCancelledByClient = true;
    });

    let scrapper: AppScraperInterface = new CheerioScraper(
      FIND_BY_HTML_ELEMENT
    );
    if (req.body.scraperType === "puppeteer") {
      scrapper = new PuppeteerScraper(SEARCH_XPATH);
    }

    const managedCodeFragments: CodeFragmentEntity[] = [];
    do {
      const [existingUser, existingHashes, mappedQuestions] =
        await validateInitialRequestData(taggedFragmentDto, userEmail, page);

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
              let managedCodeFragment;
              const codeBlock = results[index];
              const codeBlockHash = hash.MD5(`${item.questionId}.${codeBlock}`);
              log.info(`PROCESSED_CODE_BLOCK: ${codeBlock}`);
              log.info(`PROCESSED_CODE_BLOCK_MD5: ${codeBlockHash}`);
              log.info(
                `MD5_ALREADY_USED_VALUE: ${existingHashes.includes(
                  codeBlockHash
                )}`
              );

              if (existingHashes.includes(codeBlockHash) && existingUser)
                continue;

              if (existingHashes.includes(codeBlockHash) && !existingUser) {
                managedCodeFragment = await findOneAndUpdateCodeFragment(
                  codeBlockHash,
                  userEmail
                );
              } else if (!existingHashes.includes(codeBlockHash)) {
                managedCodeFragment = await createCodeFragment({
                  questionId: item.questionId,
                  tag: taggedFragmentDto.getTag(),
                  searchPhrase: taggedFragmentDto.getSearchPhrase(),
                  codeFragment: codeBlock,
                  hashMessage: codeBlockHash,
                  usersOwn: [userEmail],
                });
              }

              if (managedCodeFragment) {
                managedCodeFragments.push(managedCodeFragment);
                log.info(`MANAGED_CODE_BLOCK_CONTENT: ${managedCodeFragment}`);
              }

              if (
                managedCodeFragments.length == taggedFragmentDto.getAmount()
              ) {
                const end = new Date().getTime();
                const time = end - start;

                const codeFragmentsListDto = new CodeFragmentsListDto(
                  managedCodeFragments.map((item) => _omit(item, "usersOwn")),
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

export async function getAllCodeFragmentsForUserHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userEmail = req.user?.email;
  try {
    const limit: number = parseInt(req.query.limit as string);
    const page: number = parseInt(req.query.page as string);
    if (!userEmail) {
      throw ApiError.badRequest("CANNOT_FIND_AUTHENTICATED_USER");
    }

    const codeFragments = await findPaginatedCodeFragmentsByUser(
      userEmail,
      page,
      limit
    );
    const totalCount = await countAllCodeFragmentsByUser(userEmail);
    const codeFragmentsListDto = new CodeFragmentsListDto(
      codeFragments.map((codeFragment) => _omit(codeFragment, "usersOwn")),
      totalCount
    );
    return res.status(200).send(codeFragmentsListDto);
  } catch (error) {
    next(error);
  }
}

export async function deleteCodeFragmentHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userEmail = req.user?.email;
  try {
    if (!userEmail) {
      throw ApiError.badRequest("CANNOT_FIND_AUTHENTICATED_USER");
    }
    const hashMessage = req.params.hashMessage;

    const result = await deleteCodeFragment(userEmail, hashMessage);
    console.log(result);
    return res.status(200).send(result);
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

const validateInitialRequestData = async (
  taggedFragmentDto: TaggedFragmentDto,
  userEmail: string,
  page: number
): Promise<[boolean, string[], InternalQuestion[] | undefined]> => {
  const fetchedQuestions: _FetchedQuestionsList =
    await fetchQuestionsFromStackAPI(taggedFragmentDto.getTag(), ++page);

  const mappedQuestions = getInternalQuestionsList(fetchedQuestions.items);

  const userCodeFragments: CodeFragmentEntity[] =
    await findAllCodeFragmentsByUser(userEmail);
  const existingUser = userCodeFragments.length > 0;

  const allCodeFragments = await findAllCodeFragments();
  const existingHashes = allCodeFragments.map((x) => x.hashMessage);

  return [existingUser, existingHashes, mappedQuestions || undefined];
};
