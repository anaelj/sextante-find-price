import {getBrownser} from '../utils/browser.js'

export async function getPricesMagazine(textFind, showBrowser = false) {

  const browser = await getBrownser(showBrowser);
  
  try {
    console.log("---------------------------------------- magazine ------------------------------");
  
    const page = await browser.newPage();

    page.on("request", (request) => {
      if (request.resourceType() === "script") {
        request.abort();
      } else {
        request.continue();
      }
    });

    await page.goto(
      `https://www.magazineluiza.com.br/busca/${textFind.replace(
        " ",
        "%20"
      )}/?ordem=menor-preco` 
      // , {
      //   waitUntil: 'load',
      //   // timeout: 10
      // }
  );

    return await page
      .evaluate(() => {
        try {
          const product = [];
          const temp = document.querySelectorAll(".product");
          //   console.log(temp);

          for (let index = 0; index < temp.length; index++) {
            const element = temp[index];
            const prod = JSON.parse(element.children[0].dataset.product);
            // console.log(prod);
            product.push({
              name: prod.title,
              price: prod.price,
              link: `https://www.magazineluiza.com.br/${prod.title_url}/p/${prod.product}/${prod.category}/${prod.subCategory}/`,
            });
          }
          return product;
        } catch (error) {
          showBrowser && browser.close();
          console.log(error)
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

//  const rtx2060 = await getPricesMagazine( "rtx 1660 super");

// console.log(rtx2060);
