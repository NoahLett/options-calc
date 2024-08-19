import React from 'react';
import { FaRegTrashCan } from "react-icons/fa6";

const OptionsBlock = ({options, deleteOption}) => {

  return (
    <div className='w-full max-h-[15rem] flex flex-col'>
      <div className="block w-full overflow-x-auto">
        <table className='w-auto'>
          <thead>
            <tr>
              <th className='pr-5 sticky top-0 bg-[#231050] underline text-lg'>Ticker</th>
              <th className='pr-3 sticky top-0 bg-[#231050] underline text-lg'>Qty</th>
              <th className='pr-5 sticky top-0 bg-[#231050] underline text-lg'>Action</th>
              <th className='pr-5 sticky top-0 bg-[#231050] underline text-lg'>Type</th>
              <th className='pr-5 sticky top-0 bg-[#231050] underline text-lg'>Strike</th>
              <th className='pr-5 sticky top-0 bg-[#231050] underline text-lg'>Price</th>
              <th className='pr-12 sticky top-0 bg-[#231050] underline text-lg'>Start</th>
              <th className='pr-8 sticky top-0 bg-[#231050] underline text-lg'>Expires</th>
              <th className='pr-10 sticky top-0 bg-[#231050] underline text-lg'>BE</th>
              <th className='pr-5 sticky top-0 bg-[#231050] underline text-lg'>Live</th>
              <th className='pr-5 sticky top-0 bg-[#231050]'></th>
            </tr>
          </thead>
          <tbody>
            {options.length ?
              options.map((option, index) => (
                <tr key={option._id}>
                  <td className='text-sm'>{option.ticker}</td>
                  <td className='text-sm'>{option.quantity}</td>
                  <td className='text-sm'>{option.action.toUpperCase()}</td>
                  <td className='text-sm'>{option.optionType.toUpperCase()}</td>
                  <td className='text-sm'>${option.strikePrice}</td>
                  <td className='text-sm'>${option.price}</td>
                  <td className='text-sm'>{new Date(option.tradeDate).toLocaleDateString()}</td>
                  <td className='text-sm'>{new Date(option.expirationDate).toLocaleDateString()}</td>
                  <td className='text-sm'>${option.breakEvenPoint}</td>
                  <td className='text-sm'>{option.isHypothetical ? 'Yes' : 'No'}</td>
                  <td className='text-xs'><button onClick={() => deleteOption(option._id)}><FaRegTrashCan /></button></td>
                </tr>
              ))
            :
                <tr><td className='text-center' colSpan={10}>No Option Trades Found</td></tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OptionsBlock