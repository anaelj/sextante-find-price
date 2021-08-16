import express from "express";
import router from "./src/routes/index.js";
import cors from "cors";
import { getPricesKabum } from "./src/scrap/kabum.js";
import { getPricePichau } from "./src/scrap/pichau.js";
import { getPricesMagazine } from "./src/scrap/magazine.js";
// import { getSubmarino } from "./src/scrap/submarino.js";


const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET"],
  })
);
const port = process.env.PORT || "3333";
app.set("port", port);
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});

app.use("/prices", async (req, res) => {

  const prices = []; // [...pricesKabum.concat(pricesPichau).concat(pricesMagazine)];

  console.log(
    "---------------------------------------- start ------------------------------"
  );
  await Promise.all([
    getPricesKabum(req.query.textSearch),
    getPricePichau(req.query.textSearch),
    getPricesMagazine(req.query.textSearch),
    // getSubmarino(req.query.textSearch)
  ]).then((values) => {
    prices.push(...values[0].concat(values[1]).concat(values[2]));
  });
  console.log(
    "---------------------------------------- end thread ------------------------------"
  );

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
