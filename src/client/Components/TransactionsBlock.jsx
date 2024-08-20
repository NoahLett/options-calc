import React from 'react';
import formatDate from '../lib/dateFormater';
import { FaRegTrashCan } from 'react-icons/fa6';

const TransactionsBlock = ({transactions, deleteTransaction}) => {

  return (
      <div className="overflow-x-auto h-[12rem]">
        <table>
          <thead>
            <tr className='text-left'>
              <th className='w-[14rem] sticky top-0 bg-[#090416] underline text-lg'>Type</th>
              <th className='w-[14rem] sticky top-0 bg-[#090416] underline text-lg'>Amount</th>
              <th className='w-[14rem] sticky top-0 bg-[#090416] underline text-lg'>Date</th>
              <th className='w-[14rem] sticky top-0 bg-[#090416] underline text-lg'>Live</th>
              <th className='w-[5rem]'></th>
            </tr>
          </thead>
          <tbody>
            {transactions.length ?
              transactions.map((transaction) => (
                <tr className='text-left' key={transaction._id}>
                  <td className='text-sm'>{transaction.transactionType === 'withdrawal' ? 'W' : 'D'}</td>
                  <td className='text-sm'>${transaction.amount}</td>
                  <td className='text-sm'>{formatDate(transaction.transactionDate)}</td>
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
  )
}

export default TransactionsBlock