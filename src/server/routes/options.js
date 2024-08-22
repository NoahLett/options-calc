import express from 'express';
import OptionTrade from '../models/OptionTrade.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const trade = new OptionTrade(req.body);
    await trade.save();
    res.status(201).send(trade);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const allOptions = await OptionTrade.find({}).sort({ tradeDate: 1 });
    res.status(200).send(allOptions);
  } catch (error) {
    res.status(500).send({ message: 'Server error', error });
  }
});

router.delete('/:id', async (req, res) => {
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

export default router;
