import mongoose from "mongoose";

const stockTradeSchema = new mongoose.Schema({
  ticker: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    enum: ['sell', 'buy'],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  tradePrice: {
    type: Number,
    required: true,
  },
  currentPrice: {
    type: Number,
    required: true,
  },
  tradeDate: {
    type: Date,
    default: Date.now,
    required: true,
  }
});

const StockTrade = mongoose.model('SockTrade', stockTradeSchema);

export default StockTrade;