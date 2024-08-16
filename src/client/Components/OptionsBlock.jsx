import React from 'react';

const OptionsBlock = ({options, deleteOption}) => {

  return (
    <>
      <table className='w-[768px]'>
        <thead>
          <tr className='text-center'>
            <th className='w-[5rem]'>Ticker</th>
            <th className='w-[3rem]'>Qty</th>
            <th className='w-[4rem]'>Action</th>
            <th className='w-[4rem]'>Type</th>
            <th className='w-[4rem]'>Strike</th>
            <th className='w-[4rem]'>Price</th>
            <th className='w-[6rem]'>Trade Date</th>
            <th className='w-[6rem]'>Expiration</th>
            <th className='w-[6rem]'>Breakeven</th>
            <th className='w-[4rem]'>Live</th>
            <th className='w-[4rem]'></th>
          </tr>
        </thead>
        <tbody>
          {options.length ?
            options.map((option) => (
              <tr className='text-center' key={option._id}>
                <td>{option.ticker}</td>
                <td>{option.quantity}</td>
                <td>{option.action.toUpperCase()}</td>
                <td>{option.optionType.toUpperCase()}</td>
                <td>${option.strikePrice}</td>
                <td>${option.price}</td>
                <td>{new Date(option.tradeDate).toLocaleDateString()}</td>
                <td>{new Date(option.expirationDate).toLocaleDateString()}</td>
                <td>${option.breakEvenPoint}</td>
                <td>{option.isHypothetical ? 'Yes' : 'No'}</td>
                <td><button onClick={() => deleteOption(option._id)}>Delete</button></td>
              </tr>
            ))
          :
              <tr><td className='text-center' colSpan={10}>No Option Trades Found</td></tr>
          }
        </tbody>
      </table>
    </>
  )
}

export default OptionsBlock