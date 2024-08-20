import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    transactionType: {
        type: String,
        enum: ['deposit', 'withdrawal'],
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
    transactionDate: {
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

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;