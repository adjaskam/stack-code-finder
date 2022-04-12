import fetch from "node-fetch";
import ApiError from "./errors/ApiError";
import log from "./loggers";
import config from "config";

const stackApiKey = config.get("stackApiKey") as string;

const prepareUrl = (tag: string, page: number) => {
  const params = [
    `tagged=${tag}`,
    "site=stackoverflow",
    `key=${stackApiKey}`,
    `page=${page}`,
  ];

  return `https://api.stackexchange.com/2.3/questions?${params.join("&")}`;
};

export async function fetchQuestionsFromStackAPI(tag: string, page: number) {
  try {
    const url = prepareUrl(tag, page);
    const response = await fetch(url);
    log.info(`RESPONSE_RECEIVED_FROM: ${url}`);

    return response.json();
  } catch (error) {
    throw ApiError.stackApiIssue(error.message);
  }
}
