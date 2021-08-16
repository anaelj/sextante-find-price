import puppeteer from "puppeteer";

export async function getPricesKabum( textFind, showBrowser = false) {
  try {

    console.log("---------------------------------------- kabum ------------------------------");
    // const browser = await puppeteer.launch({ headless: !showBrowser });

    const browser = await puppeteer.launch({
      'args' : [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    });

    const page = await browser.newPage();

    await page.goto(
      `https://www.kabum.com.br/busca?query=${textFind.replace(
        " ",
        "+"
      )}&page_number=1&page_size=20&facet_filters=&sort=price`
    );

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
            product.push({
              name: element.getElementsByTagName("h2")[0].innerText,
              price: element
                .getElementsByTagName("span")[1]
                .innerText.replace(" ", "")
                .replace("R$", "")
                .replace(".", "")
                .replace(",", "."),
                link: element.href,
            });
          }
          return product;
        } catch (error) {
          temp = "error";
        }

        return error;
      })
      .then((res) => {
        !showBrowser && browser.close();
        return res;
      });
  } catch (error) {
    return error;
  }
}

// const rtx2060 = await getPricesKabum(true, "rtx 2060");
// const rtx1660 = await getPricesKabum(true, "rtx 1660 super");
// const rtx3080 = await getPricesKabum(true, "rtx 3080");
// const rtx3070 = await getPricesKabum(true, "rtx 3070");
// console.log([rtx2060, rtx1660, rtx3070, rtx3080]);
