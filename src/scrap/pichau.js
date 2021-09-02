import {getBrownser} from '../utils/browser.js'

export async function getPricePichau(textFind, showBrowser = false) {
  
  const browser = await getBrownser(showBrowser);

  try {
    console.log(
      "---------------------------------------- pichau ------------------------------"
    );
    const page = await browser.newPage();

    await page.goto(
      `https://www.pichau.com.br/search?q=${textFind.replace(
        " ",
        "%20"
      )}&sort=price-asc`,
      // {
      //   waitUntil: "load",
      //   // timeout: 10
      // }
    );

    return await page
      .evaluate(() => {
        try {
          const product = [];
          const itemGrid = document.querySelectorAll(".MuiGrid-item"); //MuiCardContent-root jss55
          const temp = document.querySelectorAll(".MuiCardContent-root"); //MuiCardContent-root jss55

          if (!temp.length > 0) {
            showBrowser && browser.close();
            return [];
          }

          for (let index = 0; index < temp.length; index++) {
            const element = temp[index];
            const name = element?.getElementsByTagName("h2")[0]?.innerText;
            const value = element
              ?.getElementsByTagName("div")[3]
              ?.innerText.replace(/\D/g, "");
            const link = itemGrid[index]?.getElementsByTagName("a")[0]?.href;

            // console.log(name, value, link);

            if (name && value && link) {
              product.push({
                name: name,
                price:
                  value.substring(0, value.length - 2) +
                  "." +
                  value.substring(value.length - 2, value.length),
                link: link,
              });
            }
          }

          return product;
        } catch (error) {
          // console.log("error pichau");
          showBrowser && browser.close();
          return product;
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

// const teste = await getPricePichau("rtx 2060", true);
// console.log(teste);
