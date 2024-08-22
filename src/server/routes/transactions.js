import express from 'express';
import Transaction from '../models/Transaction.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).send(transaction);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const allTransactions = await Transaction.find({}).sort({ transactionDate: 1 });
    res.status(200).send(allTransactions);
  } catch (error) {
    res.status(500).send({ message: 'Server error', error });
  }
});

router.delete('/:id', async (req, res) => {
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

export default router;
