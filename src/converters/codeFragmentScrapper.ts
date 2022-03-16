import puppeteer from "puppeteer";

type PreElement = {
  innerText: String;
};
export async function scrapCodeFragment(url: string) {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "/usr/bin/chromium-browser",
    args: ["--no-sandbox", "--disable-gpu"],
  });
  const page = await browser.newPage();
  await page.goto(
    "https://stackoverflow.com/questions/71385317/how-to-create-an-aspect-class-that-will-implement-the-logging-functionality"
  );

  await page.waitForXPath("//pre[contains(@class, 's-code-block')]");

  const getXPath = await page.$x("//pre[contains(@class, 's-code-block')]");
  const elements = await Promise.all(
    getXPath.map((xpath) => {
      return page.evaluate((name) => name.innerText, xpath);
    })
  );
  return elements;
}
