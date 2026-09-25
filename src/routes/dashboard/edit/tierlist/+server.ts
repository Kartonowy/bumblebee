export const x = Math.floor(200) 

import { json } from "@sveltejs/kit";
import puppeteer from "puppeteer-extra"
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin())

const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.setUserAgent(
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
);

await page.setViewport({
  width: Math.floor(1024 + Math.random() * 100),
  height: Math.floor(768 + Math.random() * 100),
});

const fetchFandom = async (pageUrl: string) => {
    await page.goto(pageUrl)

    await page.waitForSelector("#firstHeading");

    const titleSelector = await page.locator("#firstHeading").waitHandle();
    const title = (await titleSelector.evaluate(el => el.textContent)).trim()
    console.log("xd")

    const seriesSelector = await page.locator(".fandom-community-header__community-name").waitHandle();
    const series = (await seriesSelector.evaluate(el => el.textContent.replace(" Wiki", ""))).trim()

    const imageSelector = await page.locator(".pi-image-thumbnail").waitHandle();
    const imageUrl = (await imageSelector.evaluate(el => (el as HTMLImageElement).src ?? "")).trim()

    const preparedUrl = imageUrl.split("/revision/")[0]


    return [title, series, preparedUrl];
}

export async function POST({ request }) {

    const { fandomUrl } = await request.json()

    let url;
    try {
        url = new URL(fandomUrl);
    } catch (err: any) {
        console.log(err)
        return json({}, { status: 422 });
    }

    if (!url.href.includes("fandom")) {
        return json({}, { status: 422 });
    }


    const [title, series, preparedUrl] = await fetchFandom(url.href)

    return json({ title, series, preparedUrl }, { status: 201 });
}