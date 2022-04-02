import { gotScraping } from "got-scraping";
import cheerio from "cheerio";
import ApiError from "../errors/ApiError";
import { AppScraperInterface } from "./AppScraperInterface";

class CheerioScraper implements AppScraperInterface {
  findBy: string;
  constructor(findBy: string) {
    this.findBy = findBy;
  }

  async scrapCodeFragment(url: string): Promise<string[]> {
    try {
      const response = await gotScraping(url);
      const html = response.body;

      const elements: string[] = [];
      const $ = await cheerio.load(html);
      const entries = $(this.findBy);
      entries.each((index: number, item: any) => {
        elements.push($(item).text());
      });
      return elements;
    } catch (error) {
      throw ApiError.scrapperIssue(error.message);
    }
  }
}

export default CheerioScraper;
