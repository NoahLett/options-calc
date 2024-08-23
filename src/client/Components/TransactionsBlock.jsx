import React, { useState } from 'react';
import formatDate from '../lib/dateFormater';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";

const TransactionsBlock = (
      { 
        transactions,
        setSelectedTransactionIds, 
        selectedTransactionIds, 
      }) => {

  const [isOpen, setIsOpen] = useState(true);

  const handleRowClick = (transactionId) => {
      setSelectedTransactionIds((prevSelectedIds) => {
        if (prevSelectedIds.includes(transactionId)) {
          return prevSelectedIds.filter((id) => id !== transactionId);
        } else {
          return [...prevSelectedIds, transactionId];
        }
      });
  };

  const handleOpen = (view) => {
    setIsOpen(view);
  }

  return (
    <>
      <div className='flex justify-between items-center mx-3'>
        <h2 className='text-xl mb-1 font-bold'>Deposits &amp; Withdrawals</h2>
        {isOpen ? <FaRegEye onClick={() => handleOpen(false)} /> : <FaRegEyeSlash onClick={() => handleOpen(true)} />}
      </div>
      <div className={`border border-sky-500 p-2 rounded-md mb-5 block-container ${isOpen ? 'show' : ''}`}>
        <div className="overflow-x-auto h-[16rem]">
          <table>
            <thead>
              <tr className='text-left'>
                <th className='w-[14rem] sticky top-0 text-lg'>Type</th>
                <th className='w-[14rem] sticky top-0 text-lg'>Amount</th>
                <th className='w-[14rem] sticky top-0 text-lg'>Date</th>
                <th className='w-[14rem] sticky top-0 text-lg'>Live</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length ?
                transactions.map((transaction) => (
                  <tr 
                    className={`text-left cursor-pointer ${
                      selectedTransactionIds.includes(transaction._id)
                      ? 'bg-indigo-600 text-white transition-all ease-in'
                      : 'bg-transparent transition-all ease-in'
                    }`}
                    key={transaction._id}
                    onClick={() => handleRowClick(transaction._id)}  
                  >
                    <td className='text-sm'>{transaction.transactionType === 'withdrawal' ? 'W' : 'D'}</td>
                    <td className='text-sm'>${transaction.amount}</td>
                    <td className='text-sm'>{formatDate(transaction.transactionDate)}</td>
                    <td className='text-sm'>{transaction.isHypothetical ? 'No' : 'Yes'}</td>
                  </tr>
                ))
              :
                  <tr><td className='text-center' colSpan={4}>No Transactions Found</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default TransactionsBlock