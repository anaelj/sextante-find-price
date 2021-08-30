import puppeteer from "puppeteer";

export async function getPricesCasasbahia(textFind, showBrowser = false) {
  try {
    console.log(
      "---------------------------------------- kabum -----------------------------"
    );
    const browser = await puppeteer.launch({ headless: !showBrowser });

    // const browser = await puppeteer.launch({
    //   'args' : [
    //     '--no-sandbox',
    //     '--disable-setuid-sandbox'
    //   ]
    // });

    const page = await browser.newPage();

    await page.goto(
      `https://www.casasbahia.com.br/${textFind.replace(
        " ",
        "-"
      )}/b?sortby=ascprice`
    );

    // console.log('1')
    // await page.waitForNavigation( {options : { waitUntil: 'domcontentloaded' }});
    // console.log('2')

    return await page
      .evaluate(() => {
        try {
          const product = [];
          const temp = document
            .getElementsByTagName("article")[0]
            .children[2].getElementsByTagName("li");

          // console.log(temp[0]);
          for (let index = 0; index < temp.length; index++) {
            const element = temp[index];
            const nomeProduto = element?.childNodes[0]?.innerText;

            const value = element?.childNodes[0]
              .getElementsByTagName("span")[3]
              ?.innerText?.replace(/\D/g, "");

            console.log(value)

            product.push({
              name: nomeProduto.substring(1,nomeProduto.indexOf("\n")),
              price:
                value?.substring(0, value.length - 2) +
                "." +
                value?.substring(value.length - 2, value.length),
              link: element?.childNodes[0]?.getElementsByTagName('a')[0]?.href,
            });
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
    return error;
  }
}
// const rtx2060 = await getPricesCasasbahia("rtx 2060", true);
// console.log(rtx2060);

// console.log(rtx2060);
// const rtx1660 = await getPricesCasasbahia(true, "rtx 1660 super");
// const rtx3080 = await getPricesCasasbahia(true, "rtx 3080");
// const rtx3070 = await getPricesCasasbahia(true, "rtx 3070");
// console.log([rtx2060, rtx1660, rtx3070, rtx3080]);
