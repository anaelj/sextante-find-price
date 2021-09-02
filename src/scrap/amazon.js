import { getBrownser } from "../utils/browser.js";

export async function getPagesAmazon(textFind, showBrowser = false) {
  const prices = [];
  const functions = [];

  for (let page = 1; page < 3; page++) {
    functions.push(getPricesAmazon(textFind, showBrowser, page));
  }
  await Promise.all(functions).then((values) => {
    prices.push(...values[0]);
  });

  // console.log(prices);
  return prices;
}

export async function getPricesAmazon(
  textFind,
  showBrowser = false,
  pageNumber = 1
) {
  const browser = await getBrownser(showBrowser);

  // const browser = await puppeteer.launch({ headless: !showBrowser });

  // const browser = await puppeteer.launch({
  //   'args' : [
  //     '--no-sandbox',
  //     '--disable-setuid-sandbox'
  //   ]
  // });
  try {
    console.log(
      "---------------------------------------- Amazon -----------------------------"
    );

    const page = await browser.newPage();

    // await page.setDefaultNavigationTimeout(1000);

    await page.goto(
      `https://www.amazon.com.br/s?k=${textFind.replace(
        " ",
        "+"
      )}&s=price-asc-rank&page=${pageNumber}&__mk_pt_BR=ÅMÅŽÕÑ` //&qid=1630429390&ref=sr_pg_${page}
      // {
      //   waitUntil: "load",
      //   // timeout: 10
      // }
    );
    // console.log('1')
    // await page.waitForNavigation( {options : { waitUntil: 'domcontentloaded' }});
    // console.log('2')
    return await page
      .evaluate(() => {
        try {
          const product = [];
          const temp = document
            .querySelectorAll(".sg-col-inner")[2]
            .getElementsByTagName("div")[3]
            .querySelectorAll(".sg-col-inner");

          if (!temp.length > 0) {
            showBrowser && browser.close();
            return [];
          }

          // console.log(temp);
          for (let index = 0; index < temp.length; index++) {
            const element = temp[index];

            const name = element.childNodes[1]
              .getElementsByTagName("div")[4]
              ?.getElementsByTagName("a")[0]
              ?.getElementsByTagName("span")[0].innerText;
            const price = element.childNodes[1]
              .getElementsByTagName("div")[4]
              ?.querySelectorAll(".a-price-whole")?.[0]?.innerText;
            const link = element.childNodes[1]
              .getElementsByTagName("div")[4]
              ?.getElementsByTagName("a")[0]?.href;

            if (price && name && link) {
              product.push({
                name,
                price: price.replace(/\D/g, ""),
                link,
              });
            }
            // console.log(element.childNodes[1].getElementsByTagName("div")[4]?.querySelectorAll(".a-price-whole")?.[0]?.innerText); //?.[0].innerText
            // const value = element?.childNodes[0]
            //   .getElementsByTagName("span")[3]
            //   ?.innerText?.replace(/\D/g, "");
            // console.log(product)
          }
          return product;
        } catch (error) {
          showBrowser && browser.close();
          temp = "error";
        }

        return error;
      })
      .then((res) => {
        showBrowser && browser.close();
        return res;
      });
  } catch (error) {
    console.log(error);
    browser && browser.close();
    return [];
  }
}
//  const rtx2060 = await getPricesAmazon("rtx 2060", true, 2);
//  console.log(rtx2060);

// const teste = await getPagesAmazon("rx 2060", true);
// console.log(teste);

// console.log(rtx2060);
// const rtx1660 = await getPricesAmazon(true, "rtx 1660 super");
// const rtx3080 = await getPricesAmazon(true, "rtx 3080");
// const rtx3070 = await getPricesAmazon(true, "rtx 3070");
// console.log([rtx2060, rtx1660, rtx3070, rtx3080]);
