export interface AppScraperInterface {
  findBy: string;
  scrapCodeFragment(url: string): Promise<string[]>;
}
