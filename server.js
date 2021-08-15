import express from "express";
import router from "./src/routes/index.js";
import cors from "cors";
import { getPricesKabum } from "./src/scrap/kabum.js";
import { getPricePichau } from "./src/scrap/pichau.js";
import { getPricesMagazine } from "./src/scrap/magazine.js";

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || "3333";
app.set("port", port);

app.use("/prices", async (req, res) => {
  const pricesKabum = await getPricesKabum(req.query.textSearch);
  const pricesPichau = await getPricePichau(req.query.textSearch)
  const pricesMagazine = await getPricesMagazine(req.query.textSearch)

  const prices = [...pricesKabum.concat(pricesPichau).concat(pricesMagazine)];
  // console.log(req.query.textSearch)
  res.send(prices);
});

app.use("/teste", (req, res) => {
  res.send({ name: "teste" });
});

app.listen(port, async () => {
  try {
    console.log("Api Started");
  } catch (error) {
    console.log("error");
  }
});
