import {getBrownser} from '../utils/browser.js'

export async function getPricesKabum(textFind, showBrowser = false) {
  
  const browser = await getBrownser(showBrowser);

  try {
    console.log(
      "---------------------------------------- kabum -----------------------------"
    );


    const page = await browser.newPage();

    await page.goto(
      `https://www.kabum.com.br/busca?query=${textFind.replace(
        " ",
        "+"
      )}&page_number=1&page_size=20&facet_filters=&sort=price`,
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
            .getElementsByTagName("main")[0]
            .getElementsByTagName("main")[0]
            .getElementsByTagName("a");

          for (let index = 0; index < temp.length; index++) {
            const element = temp[index];

            const name = element.getElementsByTagName("h2")[0].innerText;
            const price = element
              ?.getElementsByTagName("span")[1]
              ?.innerText.replace(" ", "")
              .replace("R$", "")
              .replace(".", "")
              .replace(",", ".");

            const link = element?.href;

            if (name && price && link) {
              product.push({
                name,
                price,
                link,
              });
            }
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
// const rtx2060 = await getPricesKabum("rtx 2060", true);

// console.log(rtx2060);
// const rtx1660 = await getPricesKabum(true, "rtx 1660 super");
// const rtx3080 = await getPricesKabum(true, "rtx 3080");
// const rtx3070 = await getPricesKabum(true, "rtx 3070");
// console.log([rtx2060, rtx1660, rtx3070, rtx3080]);
