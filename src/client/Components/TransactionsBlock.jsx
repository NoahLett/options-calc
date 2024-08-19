import React from 'react';
import { FaRegTrashCan } from 'react-icons/fa6';

const TransactionsBlock = ({transactions, deleteTransaction}) => {
  return (
    <div className='w-full max-h-[15rem] flex flex-col'>
      <div className="block w-full overflow-x-auto">
        <table className='w-auto'>
          <thead>
            <tr className='text-left'>
              <th className='w-[14rem] sticky top-0 bg-transparent underline text-lg'>Type</th>
              <th className='w-[14rem] sticky top-0 bg-[#1b0e39] underline text-lg'>Amount</th>
              <th className='w-[14rem] sticky top-0 bg-[#170d2e] underline text-lg'>Date</th>
              <th className='w-[14rem] sticky top-0 bg-[#170c2e] underline text-lg'>Live</th>
              <th className='w-[5rem]'></th>
            </tr>
          </thead>
          <tbody>
            {transactions.length ?
              transactions.map((transaction) => (
                <tr className='text-left' key={transaction._id}>
                  <td className='text-sm'>{transaction.transactionType === 'withdrawal' ? 'W' : 'D'}</td>
                  <td className='text-sm'>${transaction.amount}</td>
                  <td className='text-sm'>{new Date(transaction.transactionDate).toLocaleDateString()}</td>
                  <td className='text-sm'>{transaction.isHypothetical ? 'Yes' : 'No'}</td>
                  <td className='text-xs'><button onClick={() => deleteTransaction(transaction._id)}><FaRegTrashCan /></button></td>
                </tr>
              ))
            :
                <tr><td className='text-center' colSpan={4}>No Transactions Found</td></tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TransactionsBlock