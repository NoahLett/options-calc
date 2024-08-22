import React from 'react';
import formatDate from '../lib/dateFormater';

const OptionsBlock = (
      {
        options,
        selectedOptionIds, 
        setSelectedOptionIds,  
      }) => {

  const handleRowClick = (optionId) => {
        setSelectedOptionIds((prevSelectedIds) => {
          if (prevSelectedIds.includes(optionId)) {
            return prevSelectedIds.filter((id) => id !== optionId);
          } else {
            return [...prevSelectedIds, optionId];
          }
        });
    };

  return (
    <>
      <h2 className='text-xl ml-3 mb-1 font-bold'>Option Trades</h2>
      <div className='border border-sky-500 p-2 rounded-md mb-5'>
        <div className="overflow-x-auto h-[16rem]">
          <table>
            <thead>
              <tr className='text-left'>
                <th className='pr-5 sticky top-0 text-lg'>Ticker</th>
                <th className='pr-24 sticky top-0 text-lg'>Trade</th>
                <th className='pr-5 sticky top-0 text-lg'>Premium</th>
                <th className='pr-12 sticky top-0 text-lg'>Start</th>
                <th className='pr-8 sticky top-0 text-lg'>Expires</th>
                <th className='pr-12 sticky top-0 text-lg'>BE</th>
                <th className='pr-5 sticky top-0 text-lg'>Live</th>
              </tr>
            </thead>
            <tbody>
              {options.length ?
                options.map((option) => (
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
                    <td className='text-sm'>{option.action.toUpperCase() + ' ' + option.quantity + ' ' + option.optionType.toUpperCase() + ' @ $' + option.strikePrice}</td>
                    <td className='text-sm'>${option.price}</td>
                    <td className='text-sm'>{formatDate(option.tradeDate)}</td>
                    <td className='text-sm'>{formatDate(option.expirationDate)}</td>
                    <td className='text-sm'>${option.breakEvenPoint}</td>
                    <td className='text-sm'>{option.isHypothetical ? 'No' : 'Yes'}</td>
                  </tr>
                ))
              :
                  <tr><td className='text-center' colSpan={3}>No Option Trades Found</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default OptionsBlock