import React, { act, useState } from 'react';
import axios from 'axios';

const OptionForm = () => {

  const [ticker, setTicker] = useState('');
  const [optionType, setOptionType] = useState('put');
  const [action, setAction] = useState('sell');
  const [quantity, setQuantity] = useState(1);
  const [strikePrice, setStrikePrice] = useState('');
  const [price, setPrice] = useState('');
  const [tradeDate, setTradeDate] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [isHypothetical, setIsHypothetical] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post('/api/options', {
        ticker,
        optionType,
        action,
        quantity,
        strikePrice: parseFloat(strikePrice),
        price: parseFloat(price),
        tradeDate,
        expirationDate,
        isHypothetical
      });

      setSuccess('Option trade added successfully!');
      return response;
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Server error');
    }
  }

  return (
    <div className="my-5 bg-transparent">
      <form onSubmit={handleSubmit} className='space-y-2'>

        <div className='grid grid-cols-9 gap-4'>
          <div className='col-span-3 flex flex-col'>
            <label className=" text-white">Ticker</label>
            <input
              type="text"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              placeholder="Ticker"
              required
              className="mt-1 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900"
            />
          </div>

          <div className='col-span-2 flex flex-col'>
            <label className=" text-white">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="E.g. 5"
              required
              className="mt-1 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900"
            />
          </div>

          <div className='col-span-2 flex flex-col'>
            <label className=" text-white">Action</label>
            <select
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className="mt-1 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900"
            >
              <option value="sell">Sell</option>
              <option value="buy">Buy</option>
            </select>
          </div>

          <div className='col-span-2 flex flex-col'>
            <label className=" text-white">Option</label>
            <select
              value={optionType}
              onChange={(e) => setOptionType(e.target.value)}
              className="mt-1 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900"
            >
              <option value="put">Put</option>
              <option value="call">Call</option>
            </select>
          </div>
        </div>

        <div className='grid grid-cols-12 gap-4'>
          <div className='col-span-6 flex flex-col'>
            <label className="block text-white">Strike Price</label>
            <input
              type="number"
              value={strikePrice}
              onChange={(e) => setStrikePrice(e.target.value)}
              placeholder="E.g. 120"
              required
              className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900"
            />
          </div>

          <div className='col-span-6 flex flex-col'>
            <label className="block text-white">Ask/Bid Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="E.g. .77"
              required
              className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-white">Start Date</label>
          <input
            type="date"
            value={tradeDate}
            onChange={(e) => setTradeDate(e.target.value)}
            className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900"
          />
        </div>

        <div>
          <label className="block text-white">Expiration Date</label>
          <input
            type="date"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
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
            Add Option
          </button>
        </div>
      </form>

      {error && <p className="mt-4 text-red-600">{error}</p>}
      {success && <p className="mt-4 text-green-600">{success}</p>}
    </div>
  )
}

export default OptionForm