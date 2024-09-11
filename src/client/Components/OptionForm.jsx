import React, { useState } from 'react';
import axios from 'axios';
import FeeForm from './FeeForm';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const OptionForm = ({ addOption, addFee }) => {

  const [ticker, setTicker] = useState('');
  const [optionType, setOptionType] = useState('put');
  const [action, setAction] = useState('sell');
  const [quantity, setQuantity] = useState(1);
  const [strikePrice, setStrikePrice] = useState('');
  const [price, setPrice] = useState('');
  const [tradeDate, setTradeDate] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [isHypothetical, setIsHypothetical] = useState(false);
  const [fees, setFees] = useState([]);

  const addRelatedFee = () => {
    setFees([...fees, { id: uuidv4(), feeType: 'commissions', amount: '', isHypothetical }]);
  };

  const removeRelatedFee = (id) => {
    setFees(fees.filter(fee => fee.id !== id));
  };

  const updateFee = (id, field, value) => {
    const updatedFees = fees.map(fee => 
      fee.id === id ? { ...fee, [field]: value } : fee
    );
    setFees(updatedFees);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      addOption(response.data);

      if (fees.length > 0) {
        const feePromises = fees.map(async fee => {
          const feeResponse = await axios.post('/api/fees', {
            feeType: fee.feeType,
            amount: parseFloat(fee.amount),
            feeDate: tradeDate,
            isHypothetical: fee.isHypothetical
          });

          addFee(feeResponse.data);
          return feeResponse.data;
        });

        await Promise.all(feePromises);
        toast.success('Option trade and fees added');
      } else {
        toast.success('Option trade added');
      }

      setTicker('');
      setOptionType('put');
      setAction('sell');
      setQuantity(1);
      setStrikePrice('');
      setPrice('');
      setTradeDate('');
      setExpirationDate('');
      setIsHypothetical(false);
      setFees([]);

    } catch (error) {
      toast.error(error.response ? error.response.data.message : 'Server error');
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
            onChange={(e) => {
              setIsHypothetical(e.target.checked);
              setFees(fees.map(fee => ({ ...fee, isHypothetical: e.target.checked })));
            }}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label className="ml-2 block text-white">Is Hypothetical</label>
        </div>

        <FeeForm 
          addRelatedFee={addRelatedFee}
          removeRelatedFee={removeRelatedFee}
          updateFee={updateFee}
          fees={fees}
        />

        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-3 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Option
          </button>
        </div>
      </form>
    </div>
  )
}

export default OptionForm