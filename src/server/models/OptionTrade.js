import mongoose from "mongoose";

const optionTradeSchema = new mongoose.Schema({
    ticker: {
        type: String,
        required: true,
    },
    optionType: {
        type: String,
        enum: ['put', 'call'],
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
    strikePrice: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    tradeDate: {
        type: Date,
        default: Date.now,
        required: true,
    },
    expirationDate: {
        type: Date,
        required: true,
    },
    breakEvenPoint: {
        type: Number,
    },
    isHypothetical: {
        type: Boolean,
        default: false,
        required: true,
    }
});

optionTradeSchema.pre('save', function(next) {
    if (this.optionType === 'call') {
      this.breakEvenPoint = this.strikePrice + this.price;
    } else if (this.optionType === 'put') {
      this.breakEvenPoint = this.strikePrice - this.price;
    }
    next();
});

const OptionTrade = mongoose.model('OptionTrade', optionTradeSchema);

export default OptionTrade;