import {getBrownser} from '../utils/browser.js'

export async function getPriceSubmarino(textFind, showBrowser = false) {
  
  const browser = await getBrownser(showBrowser);
  
  try {
    console.log(
      "---------------------------------------- submarino ------------------------------"
    );
    const page = await browser.newPage();

    await page.goto(
      `https://www.submarino.com.br/busca/${textFind.replace(
        " ",
        "-"
      )}?sortBy=lowerPrice`
      // {
      //   waitUntil: "load",
      //   // timeout: 10,
      // }
    );

    if (!browser) {
      console.log("bronser undefined");
      return [];
    }

    return await page
      .evaluate(() => {
        try {
          const product = [];
          const temp = document
            ?.querySelectorAll("#root")
            ?.getElementsByTagName("div")[118]
            ?.getElementsByTagName("a");

          console.log(
            "---------------------------------------------->",
            temp,
            browser
          );

          if (!temp) {
            console.log("-------aqui-------");
            showBrowser && browser.close();
            return product;
          }

          for (let index = 0; index < temp.length; index++) {
            const element = temp[index];

            const name = element?.childNodes[3]?.innerText;
            const link = element?.href;
            const value = element?.childNodes[5]
              ?.getElementsByTagName("span")[1]
              ?.innerText?.replace(/\D/g, "");

            if (name && value && link) {
              product.push({
                name,
                price:
                  value.substring(0, value.length - 2) +
                  "." +
                  value.substring(value.length - 2, value.length),

                link,
              });
            }
          }
          return product;
        } catch (error) {
          console.log(error);
          showBrowser && browser.close();
          return [];
        }
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

// const rtx2060 = await getPriceSubmarino("rx6600", true);

// console.log(rtx2060);
