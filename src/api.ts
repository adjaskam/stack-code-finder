import fetch from "node-fetch";
import log from "./logger";

// This is not considered a secret, and may be safely embed in client side code or distributed binaries.
const STACK_API_KEY = "1)QIB80MJ1mCrDp0MtRRiA((";

export async function fetchQuestionsFromStackAPI(tag: string, page: number) {
  const params = [
    `tagged=${tag}`,
    "site=stackoverflow",
    `key=${STACK_API_KEY}`,
    `page=${page}`,
  ];

  const url = `https://api.stackexchange.com/2.3/questions?${params.join("&")}`;
  try {
    const response = await fetch(url);
    log.info(`RESPONSE_RECEIVED FROM: ${url}`);
    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}
