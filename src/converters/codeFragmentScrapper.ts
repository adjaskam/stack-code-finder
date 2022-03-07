import puppeteer from "puppeteer";

type PreElement = {
  innerText: String;
}
export async function scrapCodeFragment(url: string) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(
    "https://stackoverflow.com/questions/71385317/how-to-create-an-aspect-class-that-will-implement-the-logging-functionality",
    { waitUntil: "networkidle0" }
  );

  const elements = await Array.of(
    page.$x("//pre[contains(@class, 's-code-block')]")
  );
  await browser.close();
  return elements;
}
