import express from 'express';
import StockTrade from '../models/StockTrade.js';
import dotenv from 'dotenv';
dotenv.config();

const basePath = 'https://finnhub.io/api/v1';
const router = express.Router();

const getStockQuote = async (stockTicker) => {
  const url = `${basePath}/quote?symbol=${stockTicker}&token=${process.env.VITE_FINHUB_API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  return await response.json();
}

router.post('/', async (req, res) => {
  try {
    const { ticker, action, quantity, tradePrice, tradeDate } = req.body;
    if (!ticker || !action || !quantity || !tradePrice || !tradeDate) {
      res.status(401).send({ message: 'You are missing necessary data' });
    }
    console.log(ticker);
    const stockQuote = await getStockQuote(ticker);
    const currentPrice = stockQuote.c;
    console.log(currentPrice);
    const newStockTrade = new StockTrade({
      ticker,
      action,
      quantity,
      tradePrice,
      currentPrice,
      tradeDate,
    });

    await newStockTrade.save();
    res.status(201).json(newStockTrade);
  } catch (error) {
    res.status(500).send({ message: 'Server error', error });
  }
});

router.get('/', async (req, res) => {
  try {
    const allStocks = await StockTrade.find({}).sort({ tradeDate: 1 });

    const stocksWithUpdatedPrices = await Promise.all(allStocks.map(async (stock) => {
      const stockQuote = await getStockQuote(stock.ticker);
      const updatedCurrentPrice = stockQuote.c;

      return {
        ...stock.toObject(),
        currentPrice: updatedCurrentPrice,
      };
    }));

    res.status(200).json(stocksWithUpdatedPrices);
  } catch (error) {
    res.status(500).send({ message: 'Server error', error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const stock = await StockTrade.findByIdAndDelete(req.params.id);
    if (!stock) {
      return res.status(404).send({ message: 'Stock not found' });
    }
    res.status(200).send({ message: 'Stock deleted successfully', stock });
  } catch (error) {
    res.status(500).send({ message: 'Server error', error });
  }
});

export default router;