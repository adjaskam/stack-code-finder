import fetch from "node-fetch";
import { TaggedCodeFragment } from "./controller/questionsController";

// This is not considered a secret, and may be safely embed in client side code or distributed binaries.
const STACK_API_KEY = "1)QIB80MJ1mCrDp0MtRRiA((";

export async function fetchExampleDataFromStack(
  tag: string,
  amount: number,
  page: number
) {
  const params = [
    `tagged=${tag}`,
    `pagesize=${amount}`,
    "site=stackoverflow",
    `key=${STACK_API_KEY}`,
    `page=${page}`
  ];

  try {
    const response = await fetch(
      `https://api.stackexchange.com/2.3/questions?${params.join("&")}`
    );
    console.log("URL:",
      `https://api.stackexchange.com/2.3/questions?${params.join("&")}`)
    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}
