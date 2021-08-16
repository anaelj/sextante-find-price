import puppeteer from "puppeteer";

export async function getPricePichau(textFind, showBrowser = false) {
  try {
    console.log("---------------------------------------- pichau ------------------------------");
    // const browser = await puppeteer.launch({ headless: !showBrowser });
    const browser = await puppeteer.launch({
      'args' : [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    });
    const page = await browser.newPage();
    
    await page.goto(
      `https://www.pichau.com.br/search?q=${textFind.replace(
        " ",
        "%20"
      )}&sort=price-asc`
      ,{
        timeout: 20000,
        waitUntil: ["load", "domcontentloaded", "networkidle0", "networkidle2"],
      }
    );

    return await page
      .evaluate(() => {
        try {
          const product = [];
          const itemGrid = document.querySelectorAll(".MuiGrid-item"); //MuiCardContent-root jss55
          const temp = document.querySelectorAll(".MuiCardContent-root"); //MuiCardContent-root jss55

          for (let index = 0; index < temp.length; index++) {
            const element = temp[index];
            const name = element.getElementsByTagName("h2")[0].innerText;
            const value = element
              .getElementsByTagName("div")[3]
              .innerText.replace(/\D/g, "");
            const link = itemGrid[index].getElementsByTagName("a")[0].href;

            product.push({
              name: name,
              price:
                value.substring(0, value.length-2) +
                "." +
                value.substring(value.length - 2, value.length),
              link: link,
            });
          }

          return product;
        } catch (error) {
          console.log('error pichau')
          return product;
        }
      })
      .then((res) => {
        !showBrowser && browser.close();
        return res;
      });
  } catch (error) {
    return error;
  }
}

// const teste = await getPricePichau("rtx 2060");
// console.log(teste);
