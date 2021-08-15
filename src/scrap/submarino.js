import puppeteer from "puppeteer";

export async function getSubmarino(textFind, showBrowser = false) {
  try {
    const browser = await puppeteer.launch({ headless: !showBrowser });
    const page = await browser.newPage();

    // page.on("request", (request) => {
    //   if (request.resourceType() === "script") {
    //     request.abort();
    //   } else {
    //     request.continue();
    //   }
    // });

    await page.goto(
      `https://www.submarino.com.br/busca/${textFind.replace(
        " ",
        "-"
      )}?sortBy=lowerPrice`
    );
    // await page.setJavaScriptEnabled(false);

    return await page
      .evaluate(() => {
        try {
          const product = [];
          const temp = document.getElementById("root").getElementsByTagName("div")[2].getElementsByTagName("div")[0];
          console.log(temp);

          // for (let index = 0; index < temp.length; index++) {
          //   const element = temp[index];
          //   const prod = JSON.parse(element.children[0].dataset.product);
          //   // console.log(prod);
          //   product.push({
          //     name: prod.title,
          //     price: prod.price,
          //     link: `https://www.magazineluiza.com.br/${prod.title_url}/p/${prod.product}/${prod.category}/${prod.subCategory}/`,
          //   });
          // }

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

 const rtx2060 = await getSubmarino( "rtx 2060", true);

console.log(rtx2060);
