import puppeteer from "puppeteer";

export const getBrownser = async (showBrowser) => {

//  return  await puppeteer.launch({ headless: !showBrowser });
 return browser = await puppeteer.launch({
        'args' : [
          '--no-sandbox',
          '--disable-setuid-sandbox'
        ]
      });
}
