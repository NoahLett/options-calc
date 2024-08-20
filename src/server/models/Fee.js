import mongoose from "mongoose";

const feeSchema = new mongoose.Schema({
  feeType: {
    type: String,
    enum: ['Commissions & Fees', 'Misc Fees'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    validate: {
      validator: function(v) {
      return v > 0;
      },
      message: 'Amount must be a positive number'
    }
  },
  feeDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  isHypothetical: {
    type: Boolean,
    default: false,
    required: true,
  }
});

const Fee = mongoose.model('Fee', feeSchema);

export default Fee;