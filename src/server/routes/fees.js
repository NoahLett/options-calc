import express from 'express';
import Fee from '../models/Fee.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const fee = new Fee(req.body);
    await fee.save();
    res.status(201).send(fee);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const allFees = await Fee.find({}).sort({ feeDate: 1 });
    res.status(200).send(allFees);
  } catch (error) {
    res.status(500).send({ message: 'Server error', error });
  }
});

router.delete('/:id', async (req, res) => {
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

export default router;
