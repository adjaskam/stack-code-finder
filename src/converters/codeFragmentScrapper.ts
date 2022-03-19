import { final } from "pino";
import puppeteer from "puppeteer";
import log from "../logger";

export async function scrapCodeFragment(url: string): Promise<string[]> {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/usr/bin/chromium-browser",
    args: ["--no-sandbox", "--disable-gpu"],
  });
  try {
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(4000);
    await page.goto(url);
    // await page.waitForXPath("//pre[contains(@class, 's-code-block')]", {
    //   timeout: 4000,
    // });
    const getXPath = await page.$x("//pre[contains(@class, 's-code-block')]");
    const elements = await Promise.all(
      getXPath.map((xpath) => {
        return page.evaluate((name) => name.innerText, xpath);
      })
    );
    return elements;
  } catch (error) {
    throw new Error("PUPPETEER_PROCESSING_ERROR")
  } finally {
    await browser.close();
  }
}
