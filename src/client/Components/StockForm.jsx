import React, { useState } from 'react';
import axios from 'axios';
import FeeForm from './FeeForm';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const StockForm = ({ addStock, addFee }) => {

  const [ticker, setTicker] = useState('');
  const [action, setAction] = useState('sell');
  const [quantity, setQuantity] = useState(1);
  const [tradePrice, setTradePrice] = useState('');
  const [tradeDate, setTradeDate] = useState('');
  const [fees, setFees] = useState([]);

  const addRelatedFee = () => {
    setFees([...fees, { id: uuidv4(), feeType: 'commissions', amount: '', isHypothetical: false }]);
  };

  const removeRelatedFee = (id) => {
    setFees(fees.filter(fee => fee.id !== id));
  }

  const updateFee = (id, field, value) => {
    const updatedFees = fees.map(fee => 
      fee.id === id ? { ...fee, [field]: value } : fee
    );
    setFees(updatedFees)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/stocks', {
        ticker,
        action,
        quantity,
        tradePrice,
        tradeDate
      });

      addStock(response.data);

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
        toast.success('Stock trade and fees added');
      } else {
        toast.success('Stock trade added');
      }

      setTicker('');
      setAction('sell');
      setQuantity(1);
      setTradePrice('');
      setTradeDate('');
      setFees([]);

    } catch (error) {
      toast.error(error.response ? error.response.data.message: 'Server error');
      console.log(error);
    }
  }

  return (
    <div className='my-5 bg-transparent'>
      <form onSubmit={handleSubmit} className='space-y-2'>

        <div className='grid grid-cols-9 gap-4'>
          <div className='col-span-3 flex flex-col'>
            <label className='text-white'>Ticker</label>
            <input
             type="text"
             value={ticker}
             onChange={(e) => setTicker(e.target.value)}
             placeholder='Ticker'
             required
             className='mt-1 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900' 
            />
          </div>

          <div className='col-span-3 flex flex-col'>
            <label className='text-white'>Quantity</label>
            <input 
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder='E.g. 5'
              required
              className='mt-1 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900'
            />
          </div>

          <div className='col-span-3 flex flex-col'>
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
        </div>

        <div className='grid grid-cols-8 gap-4'>
          <div className='col-span-4 flex flex-col'>
              <label className='text-white'>Price</label>
              <input 
                type="number"
                value={tradePrice}
                onChange={(e) => setTradePrice(e.target.value)}
                placeholder='E.g. 24.78'
                required
                className='mt-1 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900'
              />
            </div>

          <div className='col-span-4 flex flex-col'>
            <label className="block text-white">Date</label>
            <input
              type="date"
              value={tradeDate}
              onChange={(e) => setTradeDate(e.target.value)}
              className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900"
            />
          </div>
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
            Add Stock
          </button>
        </div>
      </form>
    </div>
  )
}

export default StockForm