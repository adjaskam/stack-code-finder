import puppeteer from "puppeteer";

const SEARCH_XPATH = "//pre[contains(@class, 's-code-block')]" as string;

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
    await page.waitForXPath(SEARCH_XPATH, {
      timeout: 4500,
    });
    const getXPath = await page.$x(SEARCH_XPATH);
    const elements = await Promise.all(
      getXPath.map((xpath) => {
        return page.evaluate((name) => name.innerText, xpath);
      })
    );
    return elements;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    await browser.close();
  }
}
