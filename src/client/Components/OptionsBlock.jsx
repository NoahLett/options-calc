import React from 'react';
import formatDate from '../lib/dateFormater';
import { FaRegTrashCan } from "react-icons/fa6";

const OptionsBlock = ({options, deleteSelectedOptions, setSelectedOptionIds, selectedOptionIds, selectedTransactionIds}) => {

  const handleRowClick = (optionId) => {
    if (!selectedTransactionIds.length) {
        setSelectedOptionIds((prevSelectedIds) => {
          if (prevSelectedIds.includes(optionId)) {
            return prevSelectedIds.filter((id) => id !== optionId);
          } else {
            return [...prevSelectedIds, optionId];
          }
        });
      }
    };

    const handleDeleteClick = () => {
      deleteSelectedOptions(selectedOptionIds);
      setSelectedOptionIds([]);
    }

  return (
      <div className="overflow-x-auto h-[16rem]">
        <table>
          <thead>
            <tr className='text-left'>
              <th className='pr-5 sticky top-0 text-lg'>Ticker</th>
              <th className='pr-3 sticky top-0 text-lg'>Qty</th>
              <th className='pr-5 sticky top-0 text-lg'>Action</th>
              <th className='pr-5 sticky top-0 text-lg'>Type</th>
              <th className='pr-5 sticky top-0 text-lg'>Strike</th>
              <th className='pr-5 sticky top-0 text-lg'>Price</th>
              <th className='pr-12 sticky top-0 text-lg'>Start</th>
              <th className='pr-8 sticky top-0 text-lg'>Expires</th>
              <th className='pr-10 sticky top-0 text-lg'>BE</th>
              <th className='pr-5 sticky top-0 text-lg'>Live</th>
            </tr>
          </thead>
          <tbody>
            {options.length ?
              options.map((option, index) => (
                <tr 
                  className={`text-left cursor-pointer ${
                    selectedOptionIds.includes(option._id)
                    ? 'bg-indigo-600 text-white transition-all ease-in'
                    : 'bg-transparent transition-all ease-in'
                  }`}
                  key={option._id}
                  onClick={() => handleRowClick(option._id)}  
                >
                  <td className='text-sm'>{option.ticker}</td>
                  <td className='text-sm'>{option.quantity}</td>
                  <td className='text-sm'>{option.action.toUpperCase()}</td>
                  <td className='text-sm'>{option.optionType.toUpperCase()}</td>
                  <td className='text-sm'>${option.strikePrice}</td>
                  <td className='text-sm'>${option.price}</td>
                  <td className='text-sm'>{formatDate(option.tradeDate)}</td>
                  <td className='text-sm'>{formatDate(option.expirationDate)}</td>
                  <td className='text-sm'>${option.breakEvenPoint}</td>
                  <td className='text-sm'>{option.isHypothetical ? 'Yes' : 'No'}</td>
                </tr>
              ))
            :
                <tr><td className='text-center' colSpan={10}>No Option Trades Found</td></tr>
            }
          </tbody>
        </table>
        <div
          className={`absolute inset-x-0 bottom-0 w-full ${
            selectedOptionIds.length > 0 ? 'left-0' : 'left-[-9999px]'
          } transition-all ease-in-out`}
        >
          <button
            className="bg-red-600 text-white py-4 rounded-md flex items-center justify-center hover:bg-red-700 w-full"
            onClick={handleDeleteClick}
          >
            Delete <FaRegTrashCan className="ml-2 text-sm" />
          </button>
        </div>
      </div>
  )
}

export default OptionsBlock