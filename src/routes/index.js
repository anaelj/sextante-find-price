import express from "express";
import { getPricesKabum } from "../scrap/kabum.js";

const router = express.Router();

router.get("/prices2", async (req, res) => {
    console.log('teste')
//   const kabumPrices = getPricesKabum("gtx 2060");
  res.send("kabumPrices");
});

export default router;
