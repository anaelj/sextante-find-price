import puppeteer from "puppeteer";

export async function getSubmarino(textFind, showBrowser = false) {

  try {
    console.log("---------------------------------------- submarino ------------------------------");
    // const browser = await puppeteer.launch({ headless: !showBrowser });
    const browser = await puppeteer.launch({
      'args' : [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    });

    const page = await browser.newPage();
    await page.goto(
      `https://www.submarino.com.br/busca/${textFind.replace(
        " ",
        "-"
      )}?sortBy=lowerPrice`
      ,{
        timeout: 20000,
        waitUntil: ["load", "domcontentloaded", "networkidle0", "networkidle2"],
      }    );

    return await page
      .evaluate(() => {
        try {
          const product = [];
          const temp = document
            .getElementById("root")
            .getElementsByTagName("div")[118]
            .getElementsByTagName("a");

          for (let index = 0; index < temp.length; index++) {
            const element = temp[index];

            // console.log(element?.childNodes[3]?.innerText)
            // console.log(element?.childNodes[5]?.getElementsByTagName("span")[1]?.innerText?.replace(/\D/g, ""));
            // console.log(element?.href);

            const value = element?.childNodes[5]
              ?.getElementsByTagName("span")[1]
              ?.innerText?.replace(/\D/g, "");

            product.push({
              name: element?.childNodes[3]?.innerText,
              price:
                value.substring(0, value.length - 2) +
                "." +
                value.substring(value.length - 2, value.length),

              link: element?.href,
            });
          }
          return product;
        } catch (error) {
          console.log(error);
          return product;
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

// const rtx2060 = await getSubmarino("rtx 2060", true);

// console.log(rtx2060);
