import puppeteer from "puppeteer";
import ApiError from "../errors/ApiError";
import { AppScraperInterface } from "./AppScraperInterface";

class PuppeteerScraper implements AppScraperInterface {
  findBy: string;
  constructor(findBy: string) {
    this.findBy = findBy;
  }

  async scrapCodeFragment(url: string): Promise<string[]> {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: "/usr/bin/chromium-browser",
      args: ["--no-sandbox", "--disable-gpu"],
    });

    try {
      const page = await browser.newPage();
      page.setDefaultNavigationTimeout(4000);
      await page.goto(url);
      await page.waitForXPath(this.findBy, {
        timeout: 4500,
      });
      const getXPath = await page.$x(this.findBy);
      const elements = await Promise.all(
        getXPath.map((xpath) => {
          return page.evaluate((name) => name.innerText, xpath);
        })
      );
      return elements;
    } catch (error) {
      throw ApiError.scrapperIssue(error.message);
    } finally {
      await browser.close();
    }
  }
}

export default PuppeteerScraper;
