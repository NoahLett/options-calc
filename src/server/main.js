import express from "express";
import ViteExpress from "vite-express";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import OptionTrade from "./models/OptionTrade.js";
import Transaction from "./models/Transaction.js";
import Fee from './models/Fee.js';
dotenv.config();

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.post('/api/options', async (req, res) => {
  try {
    const trade = new OptionTrade(req.body);
    await trade.save();
    res.status(201).send(trade);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/api/options', async (req, res) => {
  try {
    const allOptions = await OptionTrade.find({}).sort({ tradeDate: 1 });
    res.status(200).send(allOptions);
  } catch (error) {
    res.status(500).send({ message: 'Server error', error });
  }
});

app.delete('/api/options/:id', async (req, res) => {
  try {
    const option = await OptionTrade.findByIdAndDelete(req.params.id);
    if (!option) {
      return res.status(404).send({ message: 'Option not found' });
    }
    res.status(200).send({ message: 'Option deleted successfully', option });
  } catch (error) {
    res.status(500).send({ message: 'Server error', error });
  }
});

app.post('/api/transactions', async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).send(transaction);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/api/transactions', async (req, res) => {
  try {
    const allTransactions = await Transaction.find({}).sort({ transactionDate: 1 });
    res.status(200).send(allTransactions);
  } catch (error) {
    res.status(500).send({ message: 'Server error', error })
  }
});

app.delete('/api/transactions/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) {
      return res.status(404).send({ message: 'Transaction not found' });
    }
    res.status(200).send({ message: 'Transaction deleted successfully', transaction });
  } catch (error) {
    res.status(500).send({ message: 'Server error', error });
  }
});

app.post('/api/fees', async (req, res) => {
  try {
    const fee = new Fee(req.body);
    await fee.save();
    res.status(201).send(fee);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/api/fees', async (req, res) => {
  try {
    const allFees = await Fee.find({}).sort({ feeDate: 1 });
    res.status(200).send(allFees);
  } catch (error) {
    res.status(500).send({ message: 'Server error', error })
  }
});

app.delete('/api/fees/:id', async (req, res) => {
  try {
    const fee = await Fee.findByIdAndDelete(req.params.id);
    if (!fee) {
      return res.status(404).send({ message: 'Fee not found' });
    }
    res.status(200).send({ message: 'Fee deleted successfully', fee });
  } catch (error) {
    res.status(500).send({ message: 'Server error', error });
  }
});

ViteExpress.listen(app, PORT, () =>
  console.log(`Server is listening on port ${PORT}...`),
);
