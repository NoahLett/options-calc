import React, { useState } from 'react';
import axios from 'axios';

const TransactionForm = () => {

  const [transactionType, setTransactionType] = useState('deposit');
  const [amount, setAmount] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [isHypothetical, setIsHypothetical] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post('/api/transactions', {
        transactionType,
        amount: parseFloat(amount),
        transactionDate: transactionDate || new Date(),
        isHypothetical
      });

      setSuccess('Transaction added successfully!');
      return response;
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Server error')
    }
  };

  return (
    <div className="w-full my-5 bg-transparent">
      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <label className="block text-white">Transaction Type</label>
          <select
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900"
          >
            <option value="deposit">Deposit</option>
            <option value="withdrawal">Withdrawal</option>
          </select>
        </div>

        <div>
          <label className="block text-white">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
            className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900"
          />
        </div>

        <div>
          <label className="block text-white">Transaction Date</label>
          <input
            type="date"
            value={transactionDate}
            onChange={(e) => setTransactionDate(e.target.value)}
            className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isHypothetical}
            onChange={(e) => setIsHypothetical(e.target.checked)}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label className="ml-2 block text-white">Is Hypothetical</label>
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Transaction
          </button>
        </div>
      </form>

      {error && <p className="mt-4 text-red-600">{error}</p>}
      {success && <p className="mt-4 text-green-600">{success}</p>}
    </div>
  )
}

export default TransactionForm