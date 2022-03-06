import { Request, Response } from "express";
import fetch from "node-fetch";

// @todo for scrapping use -> https://www.npmjs.com/package/puppeteer

// This is not considered a secret, and may be safely embed in client side code or distributed binaries.
const STACK_API_KEY = "1)QIB80MJ1mCrDp0MtRRiA((";

export async function fetchExampleDataFromStack(req: Request, res: Response) {
  try {
    const response = await fetch(
      `https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&tagged=rust&site=stackoverflow&key=${STACK_API_KEY}`
    );
    const data = await response.json();
    return res.send(data);
  } catch (error) {
    res.status(409).send(error.message);
  }
}
